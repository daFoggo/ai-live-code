"use client"

import { useEffect } from "react"

export const PtitChat = () => {
    useEffect(() => {
        // Set up Dify chatbot configuration
        (window as Window & typeof globalThis & {
            difyChatbotConfig?: {
                token: string;
                baseUrl: string;
                systemVariables?: Record<string, unknown>;
                userVariables?: Record<string, unknown>;
            };
        }).difyChatbotConfig = {
            token: "hkyhxlotskCGPSuq",
            baseUrl: "http://aiservice1.ptit.edu.vn",
            systemVariables: {
                // user_id: 'YOU CAN DEFINE USER ID HERE',
                // conversation_id: 'YOU CAN DEFINE CONVERSATION ID HERE, IT MUST BE A VALID UUID',
            },
            userVariables: {
                // avatar_url: 'YOU CAN DEFINE USER AVATAR URL HERE',
                // name: 'YOU CAN DEFINE USER NAME HERE',
            },
        }

        // Create and append the script element
        const script = document.createElement("script")
        script.src = "http://aiservice1.ptit.edu.vn/embed.min.js"
        script.id = "hkyhxlotskCGPSuq"
        script.defer = true
        document.head.appendChild(script)

        // Add custom styles
        const style = document.createElement("style")
        style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `
        document.head.appendChild(style)

        // Cleanup function
        return () => {
            const existingScript = document.getElementById("hkyhxlotskCGPSuq")
            if (existingScript) {
                existingScript.remove()
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style)
            }
        }
    }, [])

    return (
        <div className="right-4 bottom-4 z-50 fixed">{/* The chatbot will be injected here by the external script */}</div>
    )
}
