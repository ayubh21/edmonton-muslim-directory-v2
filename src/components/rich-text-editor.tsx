"use client";

import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function RichTextEditor() {
  const [content, setContent] = useState("");

  return (
    <div className="border rounded-md mt-1 overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex items-center gap-1 flex-wrap">
        <ToggleGroup type="multiple" className="flex-wrap">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="bullet" aria-label="Toggle bullet list">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="number" aria-label="Toggle numbered list">
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator className="mx-2 h-6" orientation="vertical" />

        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your business description here..."
        className="border-0 rounded-none min-h-[200px] resize-y focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
