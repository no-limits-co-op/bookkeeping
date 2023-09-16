import 'react-native'
import React from 'react'
import App from '../src/App'

import { it } from '@jest/globals'

import renderer from 'react-test-renderer'

const mockData = {
  'Account': { 'id': '%3Aibi', 'type': 'number', 'number': 1908 },
  'Date': { 'id': '%60TmD', 'type': 'date', 'date': { 'start': '2020-08-26', 'end': null, 'time_zone': null } },
  'Desc': {
    'id': 'rtl%3A',
    'type': 'rich_text',
    'rich_text': [{
      'type': 'text',
      'text': { 'content': '全年结余，年光', 'link': null },
      'annotations': {
        'bold': false,
        'italic': false,
        'strikethrough': false,
        'underline': false,
        'code': false,
        'color': 'default'
      },
      'plain_text': '全年结余，年光',
      'href': null
    }]
  },
  'Type': {
    'id': 'w%5DsA',
    'type': 'select',
    'select': { 'id': '2b2ecb0d-717a-4426-b254-cd6e5431dbe4', 'name': 'Salary', 'color': 'yellow' }
  },
  'Resource': {
    'id': '%7DuxN',
    'type': 'select',
    'select': { 'id': 'f98c493f-352e-492d-9d01-21f10d40645c', 'name': 'Income', 'color': 'yellow' }
  },
  'Years': {
    'id': 'title',
    'type': 'title',
    'title': [{
      'type': 'text',
      'text': { 'content': '2020', 'link': null },
      'annotations': {
        'bold': false,
        'italic': false,
        'strikethrough': false,
        'underline': false,
        'code': false,
        'color': 'default'
      },
      'plain_text': '2020',
      'href': null
    }]
  }
}
it('renders correctly', () => {
  renderer.create(<App/>)
})
