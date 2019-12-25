package main

import (
	"fmt"
	"log"

	"github.com/sideshow/apns2"
	"github.com/sideshow/apns2/certificate"
	"github.com/sideshow/apns2/payload"
)

func pushNotificationPayLoad(flightNumber int) *payload.Payload {
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
	p := pushNotificationPayLoad(998)
	bytes, err := p.MarshalJSON()
	if err != nil {
		log.Fatal("Error:", err)
	}
	log.Println("temp:", string(bytes))

	cert, err := certificate.FromP12File("./CertificatesStaging.p12", "password")
	if err != nil {
		log.Fatal("Cert Error:", err)
	}

	notification := &apns2.Notification{
		DeviceToken: "50D790B0B94EA2BCB4918407877E143E3024F24AF7E1DC35478BA49616384420",
		Topic:       "web.com.staging.getcraft",
		Payload:     p,
		Priority:    apns2.PriorityHigh,
	}

	client := apns2.NewClient(cert).Production()
	res, err := client.Push(notification)

	if err != nil {
		log.Fatal("Error:", err)
	}

	if res.Sent() {
		log.Println("Sent:", res.ApnsID)
	} else {
		fmt.Printf("Not Sent: %v %v %v\n", res.StatusCode, res.ApnsID, res.Reason)
	}
}
