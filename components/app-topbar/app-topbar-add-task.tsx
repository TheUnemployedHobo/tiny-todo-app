"use client"

import Form from "next/form"
import { memo, useState } from "react"

import { taskCreate } from "@/app/actions/task-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import DatePicker from "@/components/helpers/date-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import useDirectories from "@/hooks/use-directories"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "@/hooks/use-toast"

import SubmitButton from "../helpers/submit-button"

function AddTask() {
  const [isOpen, setIsOpen] = useState(false)
  const directories = useDirectories((state) => state.directories)
  const isMobile = useIsMobile()

  const handleAction = async (f: FormData) => {
    if (await taskCreate(f)) {
      toast({
        description: "Task created successfully.",
        title: "Success",
      })
      setIsOpen(false)
    } else
      toast({
        description: "Failed to create task.",
        title: "Error",
        variant: "destructive",
      })
  }

  return (
    <RegularDialog
      content={
        <Form action={handleAction} className="flex flex-grow flex-col gap-y-5">
          <Label className="space-y-2">
            <span>Title</span>
            <Input
              maxLength={35}
              minLength={3}
              name="title"
              placeholder="Enter task title (3-35 characters)"
              required
              type="text"
            />
          </Label>
          <Label className="space-y-2">
            <span>Deadline</span>
            <DatePicker name="deadline" />
          </Label>
          <Label className="space-y-2">
            <span>Description</span>
            <Textarea
              maxLength={100}
              name="description"
              placeholder="Describe the task in detail (optional, up to 100 characters)"
            />
          </Label>
          <Label className="space-y-2">
            <span>Directory</span>
            <Select name="dir-id" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a directory" />
              </SelectTrigger>
              <SelectContent>
                {directories.map(({ id, name }) => (
                  <SelectItem key={id} value={String(id)}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox name="is-important" />
            Mark as important
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox name="is-completed" />
            Mark as completed
          </Label>
          <SubmitButton text="Add task" />
        </Form>
      }
      control={{ onOpenChange: setIsOpen, open: isOpen }}
      title="Add a task"
      trigger={<Button size={isMobile ? "sm" : "default"}>Add new task</Button>}
    />
  )
}

export default memo(AddTask)
