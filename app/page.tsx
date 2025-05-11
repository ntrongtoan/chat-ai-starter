"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  AppWindowMac,
  AudioLines,
  BotMessageSquare,
  Github,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconClassName =
  "rounded-full border bg-card text-card-foreground shadow-xl p-4";

const cardClassName =
  "rounded-lg bg-card text-card-foreground shadow-demo p-8 space-y-4 flex flex-col items-center justify-center";

const textHeading1ClassName =
  "bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent";
const textHeading2ClassName =
  "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent";
const textHeading3ClassName =
  "bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent";
const bgGradient2ClassName = "bg-gradient-to-tr from-violet-50 to-pink-50";

export default function Home() {
  const [title, setTitle] = useState("Chat Toolkit");
  return (
    <div className={cn("flex min-h-screen", bgGradient2ClassName)}>
      <div className="space-y-4 p-4 flex-1 shadow-demo">
        <div className="grid grid-cols-3 gap-4">
          <div className={cn(cardClassName, "relative group")}>
            <div className="space-y-1">
              <p className="text-3xl font-medium text-center">
                <span
                  className={cn("text-muted-foreground", textHeading2ClassName)}
                >
                  Chat Toolkit
                </span>
              </p>
              <p className="text-md font-medium text-center">
                built by{" "}
                <span className={textHeading1ClassName}>ToanNguyen</span>
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className={iconClassName}>
                <BotMessageSquare />
              </div>
              <div className={iconClassName}>
                <AudioLines />
              </div>
              <div className={iconClassName}>
                <AppWindowMac />
              </div>
              <div className="rounded-lg group-hover:opacity-100 opacity-0 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md bg-opacity-30 bg-black/5 transition-opacity duration-300">
                <div className="group-hover:opacity-100 opacity-0 absolute top-1/2 -translate-y-1/2 left-8 right-8 transition-opacity duration-300 space-y-2">
                  <div className="flex gap-2 text-md items-center">
                    <div className="rounded-full border bg-card text-card-foreground shadow-xl p-2 backdrop-blur-md bg-opacity-30 border-opacity-50">
                      <Github />
                    </div>
                    <a
                      href="https://github.com/ntrongtoan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Github
                    </a>
                  </div>
                  <div className="flex gap-2 text-md items-center">
                    <div className="rounded-full border bg-card text-card-foreground shadow-xl p-2 backdrop-blur-md bg-opacity-30 border-opacity-50">
                      <Mail />
                    </div>
                    <a
                      href="mailto:toantrongvn@gmail.com"
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      toantrongvn@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cn(cardClassName, "overflow-hidden relative")}>
            <p className="text-2xl font-medium text-center">Your Brand</p>
            <div
              className={cn(
                "h-[4rem] flex gap-2 items-center whitespace-nowrap justify-center text-[4rem] text-muted-foreground",
                textHeading3ClassName
              )}
            >
              {title}
            </div>
            <Input
              className="w-full text-center"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={cn(cardClassName)}>
            <div className="space-y-2">
              <p className="text-2xl font-medium text-center">Free for all</p>
              <p className="text-md text-center text-muted-foreground">
                Chat Toolkit is an open-source project
              </p>
            </div>
            <div className="p-4 border-violet-200 bg-violet-50 border-2 rounded-full shadow-xl">
              <div className="rounded-full border bg-card text-card-foreground shadow-xl p-4 backdrop-blur-md bg-opacity-30 border-opacity-50">
                <MessageCircleQuestion className="size-12" />
              </div>
            </div>
            <p className="text-md text-center">
              Contact me for get more support
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 w-[420px] bg-[#f5f2f9]"></div>
    </div>
  );
}
