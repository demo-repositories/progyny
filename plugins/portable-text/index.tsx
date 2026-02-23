import type {PortableTextPluginsProps} from 'sanity'
import {
  createMatchEmojis,
  useEmojiPicker,
} from '@portabletext/plugin-emoji-picker'
import emojilib from 'emojilib'
import React from 'react'

const matchEmojis = createMatchEmojis({
  emojis: emojilib,
})

function EmojiPickerUI() {
  const {
    keyword,
    matches,
    selectedIndex,
    onNavigateTo,
    onSelect,
    onDismiss,
  } = useEmojiPicker({matchEmojis})

  if (keyword.length < 1) {
    return null
  }

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
        minWidth: 200,
        maxHeight: 240,
        overflow: 'auto',
        padding: 8,
        borderRadius: 6,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        background: 'var(--card-bg-color, #fff)',
        border: '1px solid var(--card-border-color, #e0e0e0)',
      }}
    >
      {matches.length === 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <span style={{fontSize: 12, color: '#666'}}>
            No emojis for "{keyword}"
          </span>
          <button
            type="button"
            onClick={onDismiss}
            style={{
              background: 'var(--card-border-color, #eee)',
              border: 'none',
              borderRadius: 4,
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Dismiss
          </button>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
          {matches.map((match, index) => (
            <div
              key={`${match.emoji}-${index}`}
              onMouseEnter={() => onNavigateTo(index)}
              onClick={onSelect}
              role="option"
              aria-selected={selectedIndex === index}
              style={{
                padding: '6px 8px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14,
                backgroundColor:
                  selectedIndex === index
                    ? 'var(--card-hover-overlay-color, #eee)'
                    : 'transparent',
              }}
            >
              {match.emoji}{' '}
              {'keyword' in match ? String(match.keyword) : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function PortableTextEditorPlugins(props: PortableTextPluginsProps) {
  return (
    <>
      {props.renderDefault(props)}
      <EmojiPickerUI />
    </>
  )
}
