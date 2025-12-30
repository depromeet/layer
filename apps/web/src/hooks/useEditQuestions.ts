import { useAtomValue } from "jotai";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

import { useToast } from "./useToast";

import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { Questions } from "@/types/retrospectCreate";

export const useEditQuestions = () => {
  const { toast } = useToast();
  const retroCreateData = useAtomValue(retrospectCreateAtom);
  const initialQuestions = retroCreateData.questions;

  const [newQuestions, setNewQuestions] = useState<Questions>(initialQuestions);
  const [temporarilyDeletedIndexes, setTemporarilyDeletedIndexes] = useState<number[]>([]);
  const [isInputChanged, setIsInputChanged] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteItemTemporarily = (targetIndex: number) => {
    setTemporarilyDeletedIndexes((prev) => [...prev, targetIndex]);
  };

  const isTemporarilyDeleted = (index: number) => {
    return temporarilyDeletedIndexes.includes(index);
  };

  const handleDeleteConfirm = () => {
    if (temporarilyDeletedIndexes.length === 0) {
      return;
    }
    setNewQuestions((prev) => prev.filter((_, i) => !isTemporarilyDeleted(i)));
    setTemporarilyDeletedIndexes([]);
    toast.success("삭제가 완료되었어요!");
  };

  const handleDeleteCancel = () => {
    setShowDelete(false);
    setTemporarilyDeletedIndexes([]);
  };

  const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    setNewQuestions((prev) => {
      const newQuestions: Questions = [...prev];
      newQuestions[index] = {
        questionType: "plain_text",
        questionContent: e.target.value,
      };
      return newQuestions;
    });
    if (!isInputChanged) {
      setIsInputChanged(true);
    }
  };

  const handleInputChangeConfirm = () => {
    if (isInputChanged) {
      toast.success("수정이 완료되었어요!");
    }
    setIsInputChanged(false);
  };

  const handleDragEnd = ({ source, destination }: DropResult) => {
    setNewQuestions((prev) => {
      if (!destination) return prev;
      const sortedQuestions = [...prev];
      const draggedQuestion = prev[source.index];
      sortedQuestions.splice(source.index, 1);
      sortedQuestions.splice(destination.index, 0, draggedQuestion);
      return sortedQuestions;
    });
  };

  const toggleDelete = () => {
    setShowDelete((p) => !p);
  };

  const handleAddQuestions = (questionContents: string[]) => {
    const newFormattedQuestions: Questions = questionContents.map((questionContent) => ({
      questionType: "plain_text",
      questionContent,
    }));

    setNewQuestions((prev) => [...prev, ...newFormattedQuestions]);
  };

  return {
    newQuestions,
    initialQuestions,
    showDelete,
    toggleDelete,
    isTemporarilyDeleted,
    handleQuestionInputChange,
    handleInputChangeConfirm,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleDeleteItemTemporarily,
    handleDragEnd,
    handleAddQuestions,
  };
};
