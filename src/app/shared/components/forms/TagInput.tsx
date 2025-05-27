import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./TagInput.css";

type Tag = {
  id: string;
  text: string;
};

type TagInputProps = {
  suggestions: Tag[];
  maxTags: number;
};

const TagInput: React.FC<TagInputProps> = ({  suggestions, maxTags }) => {
  const { control } = useFormContext();
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<Tag[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Controller
      control={control}
      name="sintomas"
      defaultValue={[]}
      render={({ field: { onChange, value } }) => {
        const tags = Array.isArray(value) ? value : [];

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          setInput(val);

          if (!val.trim()) {
            setFiltered([]);
            setShowDropdown(false);
            setActiveIndex(-1);
            return;
          }

          const filteredSuggestions = suggestions
            .filter(
              (s) =>
                s.text.toLowerCase().includes(val.toLowerCase()) &&
                !tags.includes(s.text)
            )
            .slice(0, 5);

          setFiltered(filteredSuggestions);
          setShowDropdown(filteredSuggestions.length > 0);
          setActiveIndex(-1);
        };

        const addTag = (tagText: string) => {
          if (tags.length >= maxTags) return;
          if (tags.includes(tagText)) return;

          const newTags = [...tags, tagText.toLowerCase()];
          onChange(newTags); // Actualiza el estado en React Hook Form
          setInput("");
          setFiltered([]);
          setShowDropdown(false);
          setActiveIndex(-1);
        };

        const removeTag = (index: number) => {
          const newTags = tags.filter((_, i) => i !== index);
          onChange(newTags);
        };

        const removeAll = () => {
          onChange([]);
        };

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, -1));
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && filtered[activeIndex]) {
              addTag(filtered[activeIndex].text);
            } else if (input.trim()) {
              addTag(input.trim());
            }
          } else if (e.key === "Escape") {
            setShowDropdown(false);
            setActiveIndex(-1);
          }
        };

        return (
          <div className="tag-input-container">
            <div className="tags-wrapper">
              {tags.map((tagText, index) => (
                <div key={tagText + index} className="tag">
                  {tagText}
                  <span className="remove" onClick={() => removeTag(index)}>
                    &times;
                  </span>
                </div>
              ))}

              <input
                className="tag-input"
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (filtered.length) setShowDropdown(true);
                }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder={
                  tags.length >= maxTags ? "Maximo de sintomas" : "Agrear un sintoma..."
                }
                disabled={tags.length >= maxTags}
              />
            </div>

            {showDropdown && filtered.length > 0 && (
              <ul className="dropdown">
                {filtered.map((s, i) => (
                  <li
                    key={s.id}
                    className={i === activeIndex ? "active" : ""}
                    onMouseDown={() => addTag(s.text)}
                  >
                    {s.text}
                  </li>
                ))}
              </ul>
            )}

            {tags.length > 0 && (
              <button className="remove-all" onClick={removeAll}>
                Remover todas
              </button>
            )}
          </div>
        );
      }}
    />
  );
};

export default TagInput;
