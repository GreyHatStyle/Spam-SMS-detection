import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Step } from "react-joyride"; // Import the proper Step type

const steps: Step[] = [
    {
        // step 0
        target: "body",
        content: "Welcome to the SMS Spam Detection Demo! Let's take a quick tour to show you how to test the spam detection feature.",
        placement: 'center' as const,
    },
    {
        // step 1
        target: "#main-phone-screen",
        content: "Now please select this phone.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        spotlightClicks: true,
        title: "Alice Phone",
        placement: 'top' as const,
        hideFooter: true,
    },
    {
        // step 2
        target: '.joyride-contact-target', // Target the clickable div inside
        content: "Now please select this Contact to start the conversation!!",
        disableBeacon: true,
        hideCloseButton: true,
        spotlightClicks: true,
        hideFooter: true,
        placement: 'bottom' as const, // Changed to bottom
        disableOverlay: true,
        disableScrolling: true,
        
    },
    {
        // step 3
        target: '#sms-input-area',
        content: "Now write an SMS here and click on send",
        disableBeacon: true,
        spotlightClicks: true,
        hideFooter: true,
        placement: 'top' as const,
        disableOverlay: true,
    },
    {
        // step 4
        target: "body",
        content: "The new Message has been appeared in Bob's Phone\nMove back to see it!!",
        placement: 'center' as const,
        hideFooter: true,
    },
    {
        // step 5
        target: ".Bob-phone-screen",
        content: "Now again please Select Bob's phone",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        spotlightClicks: true,
        title: "Bob's Phone",
        placement: 'top' as const,
        hideFooter: true,
    },
    {
        // step 6
        target: "body",
        content: "Perfect!!! Now lets try sending a *SPAM* type message\nPlease Go back to Alice's Phone",
        placement: 'center' as const,
        hideFooter: true,
    },
    {
        // step 7
        target: "#main-phone-screen",
        content: "Now again please Select Alice's phone",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        spotlightClicks: true,
        title: "Alice's Phone",
        placement: 'top' as const,
        hideFooter: true,
    },
    {
        // step 8
        target: '#sms-input-area',
        // content: "Now write a spam type message\nExample: 1.You've been selected for a free vacation!\n2. Congratulations Customer!! you have been debited 2 lakh rupees!!",
        content: (
            <div>
              Now write a spam type message
              <br />
              Example: 
              <br />
              1. Your account has been suspended. Click here to reactivate: [some malicious link]
              <br />
              2. Congratulations Customer!! you have been debited 2 lakh rupees!!
              <br/>
              3. Need cash fast? Get instant ₹50,000 loan today. Apply now
            </div>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        hideFooter: true,
        placement: 'top' as const,
        disableOverlay: true,
    },
    {
        // step 9
        target: "body",
        content: "Notice, you didn't hear any Notification sound?? Because It went to Bob's Spam Box!!\n Please check to verify",
        placement: 'center' as const,
        hideFooter: true,
    },
    {
        // step 10
        target: "#spam-sms-area",
        content: "Congratulations!!! Now you can have a chat between Alice and Bob, and can experiment sending different type of messages!!!",
        placement: 'center' as const,
        hideFooter: true,
    }
];

type JoyRideNeedsType = {
    steps: Step[]
    stepIndex: number
    run: boolean
    firstTime: boolean
}

type Stores = {
    tState: JoyRideNeedsType
}

type Actions = {
    setStepIndex : (index: number) => void
    setRun : (runStatus: boolean) => void
}

export const useJoyStore = create<Stores & Actions>()(
    devtools(
        (set) => ({
            tState: {
                steps : steps,
                stepIndex: 0,
                run: true,
                firstTime: true,
            },
            
            setStepIndex: (index: number) =>
                set((state) => ({
                    tState: {
                        ...state.tState,
                        stepIndex: index,
                    },
                })),
            
            setRun: (runStatus: boolean) =>
                set((state) => ({
                    tState: {
                        ...state.tState,
                        run: runStatus
                    }
                }))
        })
    )
)