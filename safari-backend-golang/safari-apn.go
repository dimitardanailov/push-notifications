package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/sideshow/apns2"
	"github.com/sideshow/apns2/certificate"
)

/*
SafariPushNotification is a safari push notification structure
*/
type SafariPushNotification struct {
	APS APS `json:"aps"`
}

/*
APS is a safari push notification structure
*/
type APS struct {
	Alert SafariPushNotificationAlert `json:"alert"`
	Args  [3]string                   `json:"url-args"`
}

/*
SafariPushNotificationAlert store info about push notification visual bubble
*/
type SafariPushNotificationAlert struct {
	Title  string `json:"title"`
	Body   string `json:"body"`
	Action string `json:"action"`
}

func generateJSON() ([]byte, error) {
	args := [3]string{
		"boarding",
		"A998",
		"param3",
	}

	alert := SafariPushNotificationAlert{
		Title:  "Flight A998 Boarding",
		Body:   "Boarding has begun for Flight A998.",
		Action: "View",
	}
	aps := APS{
		Alert: alert,
		Args:  args,
	}
	bytes, err := json.Marshal(SafariPushNotification{
		APS: aps,
	})

	return bytes, err
}

func sendSingleMessage() {
	cert, err := certificate.FromP12File("./CertificatesStaging.p12", "password")
	if err != nil {
		log.Fatal("Cert Error:", err)
	}

	bitesPayload, err := generateJSON()
	if err != nil {
		log.Fatal("Error:", err)
	}
	fmt.Println(string(bitesPayload))

	notification := &apns2.Notification{
		DeviceToken: "50D790B0B94EA2BCB4918407877E143E3024F24AF7E1DC35478BA49616384420",
		Topic:       "web.com.staging.getcraft",
		Payload:     bitesPayload,
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

func main() {
	sendSingleMessage()
}
