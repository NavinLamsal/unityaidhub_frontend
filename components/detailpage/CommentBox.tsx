// components/CommentBox.tsx

import React from 'react';
import { Button } from '../ui/button';

interface CommentBoxProps {
  onSubmit: (content: string) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ onSubmit }) => {
  const [comment, setComment] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="flex flex-1 gap-2 w-full my-2">
      <textarea
        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-Primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-white/70 dark:placeholder:text-white dark:focus-visible:ring-white"
        placeholder="Add a comment..."
        value={comment}
        onChange={handleInputChange}
      />
      <Button
      onClick={handleSubmit}
      variant="default"
      >
        Comment
      </Button>
      
    </div>
  );
};

export default CommentBox;
