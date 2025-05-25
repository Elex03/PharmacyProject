import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './TagInput.css';

type Tag = {
  id: string;
  text: string;
};

type TagInputProps = {
  suggestions: Tag[];
  maxTags: number;
};

const TagInput: React.FC<TagInputProps> = ({ suggestions, maxTags }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState<Tag[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === '') {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const filteredSuggestions = suggestions
      .filter((s) =>
        s.text.toLowerCase().includes(value.toLowerCase()) &&
        !tags.find((tag) => tag.text === s.text)
      )
      .slice(0, 5);

    setFiltered(filteredSuggestions);
    setShowDropdown(filteredSuggestions.length > 0);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filtered[activeIndex]) {
        addTag(filtered[activeIndex]);
      } else if (input.trim()) {
        addTag({ id: input.trim(), text: input.trim() });
      }
    }
  };

  const addTag = (tag: Tag) => {
    if (tags.length >= maxTags) return;

    setTags([...tags, tag]);
    setInput('');
    setFiltered([]);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const removeAll = () => {
    setTags([]);
  };

  return (
    <div className="tag-input-container">
      <div className="tags-wrapper">
        {tags.map((tag, index) => (
          <div key={tag.id} className="tag">
            {tag.text}
            <span className="remove" onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))}

        <input
          className="tag-input"
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          placeholder={tags.length >= maxTags ? "Max tags reached" : "Add tag..."}
        />
      </div>

      {showDropdown && (
        <ul className="dropdown">
          {filtered.map((s, i) => (
            <li
              key={s.id}
              className={i === activeIndex ? 'active' : ''}
              onMouseDown={() => addTag(s)}
            >
              {s.text}
            </li>
          ))}
        </ul>
      )}

      <button className="remove-all" onClick={removeAll}>Remove All</button>
    </div>
  );
};

export default TagInput;
