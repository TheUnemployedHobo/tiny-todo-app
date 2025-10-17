"use client"

import { Pencil } from "lucide-react"
import Form from "next/form"
import { memo, useState } from "react"

import { taskEdit } from "@/app/actions/task-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

import type { TaskCardPropsType } from "./task-card-index"

import DatePicker from "../helpers/date-picker"
import SubmitButton from "../helpers/submit-button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

function TaskCardEditBtn(props: TaskCardPropsType) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = async (f: FormData) => {
    if (await taskEdit(props.id, f)) {
      toast({
        description: "The task has been successfully updated.",
        title: "Success",
      })
      setIsOpen(false)
    } else
      toast({
        description: "There was an error updating the task. Please try again.",
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
              defaultValue={props.title}
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
            <DatePicker defaultValue={props.deadline} name="deadline" />
          </Label>
          <Label className="space-y-2">
            <span>Description</span>
            <Textarea
              defaultValue={props.description}
              maxLength={100}
              name="description"
              placeholder="Describe the task in detail (optional, up to 100 characters)"
            />
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox defaultChecked={props.isImportant} name="is-important" />
            <span>Mark as important</span>
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox defaultChecked={props.isCompleted} name="is-completed" />
            <span>Mark as completed</span>
          </Label>
          <SubmitButton text="Edit task info" />
        </Form>
      }
      control={{ onOpenChange: setIsOpen, open: isOpen }}
      title="Edit this task"
      trigger={
        <Button size="icon" variant="ghost">
          <Pencil />
        </Button>
      }
    />
  )
}

export default memo(TaskCardEditBtn)
