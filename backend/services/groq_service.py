import os
import groq

def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY is missing")
    return groq.Groq(api_key=api_key)

def generate_chat_response(prompt: str, context: dict = None) -> str:
    try:
        client = get_groq_client()
        model = os.getenv("GROQ_MODEL") or ""  # will raise if missing
        
        system_prompt = (
            "You are the Vyapara Setu Business Formalization Mentor. "
            "Your role is to guide Indian entrepreneurs to formalize their businesses safely. "
            "Provide advice only for India, using Indian regulations and terminology. "
            "Focus on registrations such as Udyam/MSME, GST, FSSAI, Shop & Establishment Act, Trade Licence, Municipal permissions, PAN, Aadhaar, bank account, and state-specific compliance. "
            "Never invent fees, deadlines, or requirements; always suggest verifying with the appropriate government authority. "
            "If a requirement depends on state, city, business type, premises, turnover, employees, or food vs non-food, ask the user for the missing information or note that it must be locally verified. "
            "Answer in the language the user selected (English, Telugu, Hindi, Tamil). "
            "Provide a concise roadmap: identify needed registrations, why they are needed, where/how to apply, typical documents, process stages, dependencies, and the next practical step. "
            "Do not mention US entities like LLC, Secretary of State, SBA, etc."
        )
        
        # Build prompt with context if available
        user_message = prompt
        if context:
            user_message += f"\n\nContext: {context}"

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_message,
                }
            ],
            model=model,
        )
        return chat_completion.choices[0].message.content
        
    except Exception as e:
        return f"Error: Unable to process request. ({str(e)})"
