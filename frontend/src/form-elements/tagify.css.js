import { css } from "./../../vendor/lit-core.min.js";
export const tagstyles = css`
  :root {
    --tagify-dd-color-primary: rgb(53, 149, 246);
    --tagify-dd-text-color: black;
    --tagify-dd-bg-color: white;
    --tagify-dd-item-pad: 0.3em 0.5em;
    --tagify-dd-max-height: 300px;
  }
  .tagify {
    --tags-disabled-bg: #f1f1f1;
    --tags-border-color: #ddd;
    --tags-hover-border-color: #ccc;
    --tags-focus-border-color: #3595f6;
    --tag-border-radius: 3px;
    --tag-bg: #e5e5e5;
    --tag-hover: #d3e2e2;
    --tag-text-color: black;
    --tag-text-color--edit: black;
    --tag-pad: 0.3em 0.5em;
    --tag-inset-shadow-size: 1.1em;
    --tag-invalid-color: #d39494;
    --tag-invalid-bg: rgba(211, 148, 148, 0.5);
    --tag--min-width: 1ch;
    --tag--max-width: 100%;
    --tag-hide-transition: 0.3s;
    --tag-remove-bg: rgba(211, 148, 148, 0.3);
    --tag-remove-btn-color: black;
    --tag-remove-btn-bg: none;
    --tag-remove-btn-bg--hover: #c77777;
    --input-color: inherit;
    --placeholder-color: rgba(0, 0, 0, 0.4);
    --placeholder-color-focus: rgba(0, 0, 0, 0.25);
    --loader-size: 0.8em;
    --readonly-striped: 1;
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: wrap;
    border: 1px solid var(--tags-border-color);
    padding: 0;
    line-height: 0;
    outline: 0;
    position: relative;
    box-sizing: border-box;
    transition: 0.1s;
  }
  @keyframes tags--bump {
    30% {
      transform: scale(1.2);
    }
  }
  @keyframes rotateLoader {
    to {
      transform: rotate(1turn);
    }
  }
  .tagify:has([contenteditable="true"]) {
    cursor: text;
  }
  .tagify:hover:not(.tagify--focus):not(.tagify--invalid) {
    --tags-border-color: var(--tags-hover-border-color);
  }
  .tagify[disabled] {
    background: var(--tags-disabled-bg);
    filter: saturate(0);
    opacity: 0.5;
    pointer-events: none;
  }
  .tagify[disabled].tagify--select,
  .tagify[readonly].tagify--select {
    pointer-events: none;
  }
  .tagify[disabled]:not(.tagify--mix):not(.tagify--select),
  .tagify[readonly]:not(.tagify--mix):not(.tagify--select) {
    cursor: default;
  }
  .tagify[disabled]:not(.tagify--mix):not(.tagify--select) > .tagify__input,
  .tagify[readonly]:not(.tagify--mix):not(.tagify--select) > .tagify__input {
    visibility: hidden;
    width: 0;
    margin: 5px 0;
  }
  .tagify[disabled]:not(.tagify--mix):not(.tagify--select) .tagify__tag > div,
  .tagify[readonly]:not(.tagify--mix):not(.tagify--select) .tagify__tag > div {
    padding: var(--tag-pad);
  }
  .tagify[disabled]:not(.tagify--mix):not(.tagify--select)
    .tagify__tag
    > div::before,
  .tagify[readonly]:not(.tagify--mix):not(.tagify--select)
    .tagify__tag
    > div::before {
    animation: readonlyStyles 1s calc(-1s * (var(--readonly-striped) - 1))
      paused;
  }
  @keyframes readonlyStyles {
    0% {
      background: linear-gradient(
          45deg,
          var(--tag-bg) 25%,
          transparent 25%,
          transparent 50%,
          var(--tag-bg) 50%,
          var(--tag-bg) 75%,
          transparent 75%,
          transparent
        )
        0/5px 5px;
      box-shadow: none;
      filter: brightness(0.95);
    }
  }
  .tagify[disabled] .tagify__tag__removeBtn,
  .tagify[readonly] .tagify__tag__removeBtn {
    display: none;
  }
  .tagify--loading .tagify__input > br:last-child {
    display: none;
  }
  .tagify--loading .tagify__input::before {
    content: none;
  }
  .tagify--loading .tagify__input::after {
    content: "";
    vertical-align: middle;
    opacity: 1;
    width: 0.7em;
    height: 0.7em;
    width: var(--loader-size);
    height: var(--loader-size);
    min-width: 0;
    border: 3px solid;
    border-color: #eee #bbb #888 transparent;
    border-radius: 50%;
    animation: rotateLoader 0.4s infinite linear;
    content: "" !important;
    margin: -2px 0 -2px 0.5em;
  }
  .tagify--loading .tagify__input:empty::after {
    margin-left: 0;
  }
  .tagify + input,
  .tagify + textarea {
    position: absolute !important;
    left: -9999em !important;
    transform: scale(0) !important;
  }
  .tagify__tag {
    display: inline-flex;
    align-items: center;
    max-width: var(--tag--max-width);
    margin-inline: 5px 0;
    margin-block: 5px;
    position: relative;
    z-index: 1;
    outline: 0;
    line-height: normal;
    cursor: default;
    transition: 0.13s ease-out;
  }
  .tagify__tag > div {
    display: flex;
    flex: 1;
    vertical-align: top;
    box-sizing: border-box;
    max-width: 100%;
    padding: var(--tag-pad);
    color: var(--tag-text-color);
    line-height: inherit;
    border-radius: var(--tag-border-radius);
    white-space: nowrap;
    transition: 0.13s ease-out;
  }
  .tagify__tag > div > * {
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: top;
    min-width: var(--tag--min-width);
    max-width: var(--tag--max-width);
    transition: 0.8s ease, 0.1s color;
  }
  .tagify__tag > div > [contenteditable] {
    display: block;
    outline: 0;
    -webkit-user-select: text;
    user-select: text;
    cursor: text;
    margin: -2px;
    padding: 2px;
    max-width: 350px;
  }
  .tagify__tag > div > :only-child {
    width: 100%;
  }
  .tagify__tag > div::before {
    content: "";
    position: absolute;
    border-radius: inherit;
    inset: var(--tag-bg-inset, 0);
    z-index: -1;
    pointer-events: none;
    transition: 120ms ease;
    animation: tags--bump 0.3s ease-out 1;
    box-shadow: 0 0 0 var(--tag-inset-shadow-size) var(--tag-bg) inset;
  }
  .tagify__tag:focus div::before,
  .tagify__tag:hover:not([readonly]) div::before {
    --tag-bg-inset: -2.5px;
    --tag-bg: var(--tag-hover);
  }
  .tagify__tag--loading {
    pointer-events: none;
  }
  .tagify__tag--loading .tagify__tag__removeBtn {
    display: none;
  }
  .tagify__tag--loading::after {
    --loader-size: 0.4em;
    content: "";
    vertical-align: middle;
    opacity: 1;
    width: 0.7em;
    height: 0.7em;
    width: var(--loader-size);
    height: var(--loader-size);
    min-width: 0;
    border: 3px solid;
    border-color: #eee #bbb #888 transparent;
    border-radius: 50%;
    animation: rotateLoader 0.4s infinite linear;
    margin: 0 0.5em 0 -0.1em;
  }
  .tagify__tag--flash div::before {
    animation: none;
  }
  .tagify__tag--hide {
    width: 0 !important;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    opacity: 0;
    transform: scale(0);
    transition: var(--tag-hide-transition);
    pointer-events: none;
  }
  .tagify__tag--hide > div > * {
    white-space: nowrap;
  }
  .tagify__tag.tagify--noAnim > div::before {
    animation: none;
  }
  .tagify__tag.tagify--notAllowed:not(.tagify__tag--editable) div > span {
    opacity: 0.5;
  }
  .tagify__tag.tagify--notAllowed:not(.tagify__tag--editable) div::before {
    --tag-bg: var(--tag-invalid-bg);
    transition: 0.2s;
  }
  .tagify__tag[readonly] .tagify__tag__removeBtn {
    display: none;
  }
  .tagify__tag[readonly] > div::before {
    animation: readonlyStyles 1s calc(-1s * (var(--readonly-striped) - 1))
      paused;
  }
  @keyframes readonlyStyles {
    0% {
      background: linear-gradient(
          45deg,
          var(--tag-bg) 25%,
          transparent 25%,
          transparent 50%,
          var(--tag-bg) 50%,
          var(--tag-bg) 75%,
          transparent 75%,
          transparent
        )
        0/5px 5px;
      box-shadow: none;
      filter: brightness(0.95);
    }
  }
  .tagify__tag--editable > div {
    color: var(--tag-text-color--edit);
  }
  .tagify__tag--editable > div::before {
    box-shadow: 0 0 0 2px var(--tag-hover) inset !important;
  }
  .tagify__tag--editable > .tagify__tag__removeBtn {
    pointer-events: none;
  }
  .tagify__tag--editable > .tagify__tag__removeBtn::after {
    opacity: 0;
    transform: translateX(100%) translateX(5px);
  }
  .tagify__tag--editable.tagify--invalid > div::before {
    box-shadow: 0 0 0 2px var(--tag-invalid-color) inset !important;
  }
  .tagify__tag__removeBtn {
    order: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    cursor: pointer;
    font: 14px/1 Arial;
    background: var(--tag-remove-btn-bg);
    color: var(--tag-remove-btn-color);
    width: 14px;
    height: 14px;
    margin-inline: auto 4.6666666667px;
    overflow: hidden;
    transition: 0.2s ease-out;
  }
  .tagify__tag__removeBtn::after {
    content: "×";
    transition: 0.3s, color 0s;
  }
  .tagify__tag__removeBtn:hover {
    color: #fff;
    background: var(--tag-remove-btn-bg--hover);
  }
  .tagify__tag__removeBtn:hover + div > span {
    opacity: 0.5;
  }
  .tagify__tag__removeBtn:hover + div::before {
    box-shadow: 0 0 0 var(--tag-inset-shadow-size)
      var(--tag-remove-bg, rgba(211, 148, 148, 0.3)) inset !important;
    transition: box-shadow 0.2s;
  }
  .tagify:not(.tagify--mix) .tagify__input br {
    display: none;
  }
  .tagify:not(.tagify--mix) .tagify__input * {
    display: inline;
    white-space: nowrap;
  }
  .tagify__input {
    flex-grow: 1;
    display: inline-block;
    min-width: 110px;
    margin: 5px;
    padding: var(--tag-pad);
    line-height: normal;
    position: relative;
    white-space: pre-wrap;
    color: var(--input-color);
    box-sizing: inherit;
    overflow: hidden;
  }
  .tagify__input:focus {
    outline: 0;
  }
  .tagify__input:focus::before {
    transition: 0.2s ease-out;
    opacity: 0;
    transform: translatex(6px);
  }
  @supports (-ms-ime-align: auto) {
    .tagify__input:focus::before {
      display: none;
    }
  }
  .tagify__input:focus:empty::before {
    transition: 0.2s ease-out;
    opacity: 1;
    transform: none;
    color: rgba(0, 0, 0, 0.25);
    color: var(--placeholder-color-focus);
  }
  @-moz-document url-prefix() {
    .tagify__input:focus:empty::after {
      display: none;
    }
  }
  .tagify__input::before {
    content: attr(data-placeholder);
    width: 100%;
    height: 100%;
    margin: auto 0;
    z-index: 1;
    color: var(--placeholder-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    position: absolute;
  }
  .tagify__input::after {
    content: attr(data-suggest);
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    min-width: calc(100% - 1.5em);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
    color: var(--tag-text-color);
    opacity: 0.3;
    pointer-events: none;
    max-width: 100px;
  }
  .tagify__input .tagify__tag {
    margin: 0 1px;
  }
  .tagify--mix {
    display: block;
  }
  .tagify--mix .tagify__input {
    padding: 5px;
    margin: 0;
    width: 100%;
    height: 100%;
    line-height: 1.5;
    display: block;
  }
  .tagify--mix .tagify__input::before {
    height: auto;
    display: none;
    line-height: inherit;
  }
  .tagify--mix .tagify__input::after {
    content: none;
  }
  .tagify--select {
    cursor: default;
  }
  .tagify--select::after {
    content: ">";
    opacity: 0.5;
    position: absolute;
    top: 50%;
    right: 0;
    bottom: 0;
    font: 16px monospace;
    line-height: 8px;
    height: 8px;
    pointer-events: none;
    transform: translate(-150%, -50%) scaleX(1.2) rotate(90deg);
    transition: 0.2s ease-in-out;
  }
  .tagify--select[aria-expanded="true"]::after {
    transform: translate(-150%, -50%) rotate(270deg) scaleY(1.2);
  }
  .tagify--select .tagify__tag {
    flex: 1;
    max-width: none;
    margin-inline-end: 2em;
    margin-block: 0;
    padding-block: 5px;
    cursor: text;
  }
  .tagify--select .tagify__tag div::before {
    display: none;
  }
  .tagify--select .tagify__tag + .tagify__input {
    display: none;
  }
  .tagify--empty .tagify__input::before {
    transition: 0.2s ease-out;
    opacity: 1;
    transform: none;
    display: inline-block;
    width: auto;
  }
  .tagify--mix .tagify--empty .tagify__input::before {
    display: inline-block;
  }
  .tagify--focus {
    --tags-border-color: var(--tags-focus-border-color);
    transition: 0s;
  }
  .tagify--invalid {
    --tags-border-color: #d39494;
  }
  .tagify__dropdown {
    position: absolute;
    z-index: 9999;
    transform: translateY(-1px);
    border-top: 1px solid var(--tagify-dd-color-primary);
    overflow: hidden;
  }
  .tagify__dropdown[dir="rtl"] {
    transform: translate(-100%, -1px);
  }
  .tagify__dropdown[placement="top"] {
    margin-top: 0;
    transform: translateY(-100%);
  }
  .tagify__dropdown[placement="top"] .tagify__dropdown__wrapper {
    border-top-width: 1.1px;
    border-bottom-width: 0;
  }
  .tagify__dropdown[position="text"] {
    box-shadow: 0 0 0 3px rgba(var(--tagify-dd-color-primary), 0.1);
    font-size: 0.9em;
  }
  .tagify__dropdown[position="text"] .tagify__dropdown__wrapper {
    border-width: 1px;
  }
  .tagify__dropdown__wrapper {
    max-height: var(--tagify-dd-max-height);
    overflow: hidden;
    overflow-x: hidden;
    color: var(--tagify-dd-text-color);
    background: var(--tagify-dd-bg-color);
    border: 1px solid;
    border-color: var(--tagify-dd-color-primary);
    border-bottom-width: 1.5px;
    border-top-width: 0;
    box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.2);
    transition: 0.3s cubic-bezier(0.5, 0, 0.3, 1), transform 0.15s;
    animation: dd-wrapper-show 0s 0.3s forwards;
  }
  @keyframes dd-wrapper-show {
    to {
      overflow-y: auto;
    }
  }
  .tagify__dropdown__header:empty {
    display: none;
  }
  .tagify__dropdown__footer {
    display: inline-block;
    margin-top: 0.5em;
    padding: var(--tagify-dd-item-pad);
    font-size: 0.7em;
    font-style: italic;
    opacity: 0.5;
  }
  .tagify__dropdown__footer:empty {
    display: none;
  }
  .tagify__dropdown--initial .tagify__dropdown__wrapper {
    max-height: 20px;
    transform: translateY(-1em);
  }
  .tagify__dropdown--initial[placement="top"] .tagify__dropdown__wrapper {
    transform: translateY(2em);
  }
  .tagify__dropdown__item {
    box-sizing: border-box;
    padding: var(--tagify-dd-item-pad);
    margin: 1px;
    white-space: pre-wrap;
    cursor: pointer;
    border-radius: 2px;
    position: relative;
    outline: 0;
    max-height: 60px;
    max-width: 100%;
    line-height: normal;
    position: relative;
  }
  .tagify__dropdown__item--active {
    background: var(--tagify-dd-color-primary);
    color: #fff;
  }
  .tagify__dropdown__item:active {
    filter: brightness(105%);
  }
  .tagify__dropdown__item--hidden {
    padding-top: 0;
    padding-bottom: 0;
    margin: 0 1px;
    pointer-events: none;
    overflow: hidden;
    max-height: 0;
    transition: var(--tagify-dd-item--hidden-duration, 0.3s) !important;
  }
  .tagify__dropdown__item--hidden > * {
    transform: translateY(-100%);
    opacity: 0;
    transition: inherit;
  }
  .tagify__dropdown__item--selected::before {
    content: "✓";
    font-family: monospace;
    position: absolute;
    inset-inline-start: 6px;
    text-indent: 0;
    line-height: 1.1;
  }
  .tagify__dropdown:has(.tagify__dropdown__item--selected)
    .tagify__dropdown__item {
    text-indent: 1em;
  }
`;
