"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
    const { user } = useUser();
    console.log(user);
    useEffect(() => {
        if (!user) return;

        fetch("/api/create-user", {
            method: "POST",
            body: JSON.stringify({
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
            }),
        });
    }, [user]);

    return null; // optional
}
