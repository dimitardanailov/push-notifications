package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/sideshow/apns2"
	"github.com/sideshow/apns2/certificate"
	"github.com/sideshow/apns2/payload"
)

func safariPushNotificationPayLoad(flightNumber int) *payload.Payload {
	p := payload.NewPayload()
	p.AlertTitle(fmt.Sprintf("Flight A%v Boarding", flightNumber))
	p.AlertBody(fmt.Sprintf("Boarding has begun for Flight A%v.", flightNumber))
	p.AlertAction("View")

	p.URLArgs([]string{
		"boarding",
		fmt.Sprintf("A%v", flightNumber),
		"param3",
	})

	return p
}

func main() {
	cert, err := certificate.FromP12File("./CertificatesStaging.p12", "password")
	if err != nil {
		log.Fatal("Cert Error:", err)
	}
	client := apns2.NewClient(cert).Production()

	count := flag.Int("count", 12, "Number of pushes to send")
	notifications := make(chan *apns2.Notification, *count)
	responses := make(chan *apns2.Response, *count)

	for i := 0; i < 50; i++ {
		go worker(client, notifications, responses)
	}

	for i := 0; i < *count; i++ {
		n := &apns2.Notification{
			DeviceToken: "50D790B0B94EA2BCB4918407877E143E3024F24AF7E1DC35478BA49616384420",
			Topic:       "web.com.staging.getcraft",
			Payload:     safariPushNotificationPayLoad(i),
		}
		notifications <- n
	}

	for i := 0; i < *count; i++ {
		res := <-responses
		fmt.Printf("%v %v %v\n", res.StatusCode, res.ApnsID, res.Reason)
	}

	close(notifications)
	close(responses)
}

func worker(client *apns2.Client, notifications <-chan *apns2.Notification, responses chan<- *apns2.Response) {
	for n := range notifications {
		res, err := client.Push(n)
		if err != nil {
			log.Fatal("Push Error:", err)
		}

		responses <- res
	}
}
