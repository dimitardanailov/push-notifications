package main

import (
	"fmt"
	"log"

	"github.com/sideshow/apns2"
	"github.com/sideshow/apns2/certificate"
)

func main() {

	cert, err := certificate.FromP12File("./CertificatesStaging.p12", "password")
	if err != nil {
		log.Fatal("Cert Error:", err)
	}

	notification := &apns2.Notification{
		DeviceToken: "50D790B0B94EA2BCB4918407877E143E3024F24AF7E1DC35478BA49616384420",
		Topic:       "web.com.staging.getcraft",
		Payload:     []byte(`{"aps":{"alert":"Hello!"}}`),
		Priority:    apns2.PriorityHigh,
	}
	// notification.DeviceToken =

	// If you want to test push notifications for builds running directly from XCode (Development), use
	// client := apns2.NewClient(cert).Development()
	// For apps published to the app store or installed as an ad-hoc distribution use Production()

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

	// fmt.Printf("%v %v %v\n", res.StatusCode, res.ApnsID, res.Reason)
	// res.Sent()
}
