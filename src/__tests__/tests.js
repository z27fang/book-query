import BookCard from "../components/book-card";
import BookGallary from "../components/book-gallary";
import Header from "../components/header";
import QueryInput from "../components/queryinput";
import { queryBookByTitle } from "../lib/api";

import React from "react";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// really simple test on check click events
test('Input should fire onConfirm when entered.', () => {
  let a = '';

  const result = render(<QueryInput onConfirm={(t) => {a = t}}/>);
  const input = result.container.querySelector('#query-input-input');
  const btn = result.container.querySelector('#query-input-button');

  fireEvent.change(input, {target: {value: 'newVal'}});
  fireEvent.keyUp(input, {key: 'Enter', code: 'Enter'});
  expect(a).toBe('newVal');
  fireEvent.change(input, {target: {value: 'newVal2'}});
  fireEvent.click(btn);
  expect(a).toBe('newVal2');
})
