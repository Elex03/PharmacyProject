import React, { useState } from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';

import './TagInput.css'

const suggestions: Tag[] = [
  { id: 'Thailand', text: 'Thailand', className: '' },
  { id: 'India', text: 'India', className: '' },
  { id: 'Vietnam', text: 'Vietnam', className: '' },
  { id: 'Turkey', text: 'Turkey', className: '' },
  // ... más sugerencias
];

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

export const TagInput: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([
    {
        id: 'Thailand', text: 'Thailand',
        className: ''
    },
    {
        id: 'India', text: 'India',
        className: ''
    },
    {
        id: 'Vietnam', text: 'Vietnam',
        className: ''
    },
    {
        id: 'Turkey', text: 'Turkey',
        className: ''
    },
  ]);

  const handleDelete = (i: number) => {
    setTags(tags.filter((_tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    if (tags.length < 7) {
      setTags([...tags, tag]);
    }
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <div>
      
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        autofocus={false}
        inputFieldPosition="bottom"
        autocomplete
        placeholder="Escribe y presiona Enter"
        maxLength={50}
      />
    </div>
  );
};
