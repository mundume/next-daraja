"use client";
import React, { useState } from "react";

export default function Pleb() {
  const [amount, setAmount] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/gettoken", {
      method: "GET",
    });
    const json = await res.json();
    console.log(json.accessToken);
    const { accessToken } = json;
    if (res.status === 200) {
      await fetch("/api/stkpush", {
        method: "POST",
        body: JSON.stringify({
          amount,
          phoneNumber,
          accessToken,
        }),
      });
    }
  }

  return (
    <form onSubmit={handleClick}>
      <h1>enter phone number</h1>
      <input
        type="text"
        placeholder="enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <h1> enter amount</h1>
      <input
        type="text"
        placeholder="enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="block border">
        pleb
      </button>
    </form>
  );
}
