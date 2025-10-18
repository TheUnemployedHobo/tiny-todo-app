"use client"

import { Pencil } from "lucide-react"
import Form from "next/form"
import { memo, useState } from "react"
import { toast } from "sonner"

import { taskEdit } from "@/app/actions/task-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import { Button } from "@/components/ui/button"

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
      toast("Success", { description: "The task has been successfully updated." })
      setIsOpen(false)
    } else toast("Error", { description: "There was an error updating the task. Please try again." })
  }

  return (
    <RegularDialog
      content={
        <Form action={handleAction} className="flex flex-grow flex-col gap-y-5">
          <Label className="block space-y-2">
            <span className="block">Title</span>
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
          <Label className="block space-y-2">
            <span className="block">Deadline</span>
            <DatePicker defaultValue={props.deadline} name="deadline" />
          </Label>
          <Label className="block space-y-2">
            <span className="block">Description</span>
            <Textarea
              defaultValue={props.description}
              maxLength={100}
              name="description"
              placeholder="Describe the task in detail (optional, up to 100 characters)"
            />
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox defaultChecked={props.isImportant} name="is-important" />
            <span className="block">Mark as important</span>
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox defaultChecked={props.isCompleted} name="is-completed" />
            <span className="block">Mark as completed</span>
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
