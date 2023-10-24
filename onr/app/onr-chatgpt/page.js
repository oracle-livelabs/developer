'use client';
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function MessageItem({message}) {
  const [text, setText] = useState(message.author === "human" ? message.text : "");

  useEffect(() => {
    setTimeout(() => {
      setText(message.text.slice(0, text.length + 1));
    }, 10);
  }, [text, message.text]);

  return (
    <div className="answer">
      <div className={`author author-${message.author}`}>
        {message.author}:
      </div>
      <div className="message">
        {text}
      </div>
    </div>
  )
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    if (prompt.trim().length === 0) {
      return;
    }

    setMessages((messages) => [...messages, {
      text: prompt.trim(),
      id: new Date().toISOString(),
      author: "human"
    }]);

    setPrompt("");
    const response =  await fetch("api/chatgpt", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({prompt: prompt.trim()})
    });

    const res = await response.json();
    const json = JSON.parse(res)

    //console.log("json.result: " + json.result);

    setMessages((messages) => [...messages, {
      text: json.result,
      id: new Date().toISOString(),
      author: "ai"
    }]);
  }

  return (
    <div className="container">

      <div className="grid w-full gap-2">
        <Textarea placeholder="Ask a question." onChange={(e) => {
            setPrompt(e.target.value);
          }} 
          value={prompt}/>
        <Button  
        onClick={handleSubmit}>Submit question to ChatGPT</Button>
      </div>

      <div className="answers">
        {messages.map(message => 
          <MessageItem 
            key={message.id} 
            message={message} 
          />
        )}
      </div>
    </div>
  )
}
