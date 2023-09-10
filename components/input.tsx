"use client";
import React, { useState } from "react";

export default function Pleb() {
  const [amount, setAmount] = useState<string>();

  async function handleClick() {
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
          accessToken,
        }),
      });
    }
  }

  return (
    <form onSubmit={handleClick}>
      <h1> enter amount</h1>
      <input
        type="number"
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
