import { describe, it, expect } from '@jest/globals'
import { DatabaseORM } from 'src/orms/databaseORM'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

// Note: test renderer must be required after react-native.

describe('Notion Data Reflection', () => {
  const notionData: QueryDatabaseResponse = {
    'object': 'list', 'results': [{
      'object': 'page',
      'id': '371d334b-6c30-47bd-952e-22703528fe31',
      'created_time': '2023-08-12T13:58:00.000Z',
      'last_edited_time': '2023-08-31T01:20:00.000Z',
      'created_by': { 'object': 'user', 'id': 'ffa06548-0fa4-4de3-9bf8-e7c82a51a21d' },
      'last_edited_by': { 'object': 'user', 'id': 'ffa06548-0fa4-4de3-9bf8-e7c82a51a21d' },
      'cover': null,
      'icon': null,
      'parent': { 'type': 'database_id', 'database_id': '25549404-4e7f-4bc3-ad6a-81239153901a' },
      'archived': false,
      'properties': {
        'Account': { 'id': '%3Aibi', 'type': 'number', 'number': -1000 },
        'Date': { 'id': '%60TmD', 'type': 'date', 'date': { 'start': '2023-08-26', 'end': null, 'time_zone': null } },
        'Desc': {
          'id': 'rtl%3A',
          'type': 'rich_text',
          'rich_text': [{
            'type': 'text',
            'text': { 'content': 'jpoiwjfw; jfoijwpfwe;jpeiowjf', 'link': null },
            'annotations': {
              'bold': false,
              'italic': false,
              'strikethrough': false,
              'underline': false,
              'code': false,
              'color': 'default'
            },
            'plain_text': 'jpoiwjfw; jfoijwpfwe;jpeiowjf',
            'href': null
          }]
        },
        'Type': {
          'id': 'w%5DsA',
          'type': 'select',
          'select': { 'id': 'ded44f7c-248b-4c58-ab17-89267cdae0b8', 'name': 'Diet', 'color': 'red' }
        },
        'Resource': {
          'id': '%7DuxN',
          'type': 'select',
          'select': { 'id': 'f41a3118-1113-43c9-be1d-c45208d3d01e', 'name': 'Outcome', 'color': 'red' }
        },
        'Years': {
          'id': 'title',
          'type': 'title',
          'title': [{
            'type': 'text',
            'text': { 'content': '2023', 'link': null },
            'annotations': {
              'bold': false,
              'italic': false,
              'strikethrough': false,
              'underline': false,
              'code': false,
              'color': 'default'
            },
            'plain_text': '2023',
            'href': null
          }]
        }
      },
      'url': 'https://www.notion.so/2023-371d334b6c3047bd952e22703528fe31',
      'public_url': null
    }], 'next_cursor': null, 'has_more': false, 'type': 'page_or_database', 'page_or_database': {}
  }
 
  it('should create serialized data items', () => {
    const serializedData = new DatabaseORM(notionData)
    expect(serializedData.dataItems).toEqual([{
      id: '371d334b-6c30-47bd-952e-22703528fe31',
      Account: -1000,
      Years: '2023',
      Type: {
        title: 'Diet',
        color: 'red'
      },
      Resource: {
        title: 'Outcome',
        color: 'red'
      },
      Date: '2023-08-26',
      Desc: 'jpoiwjfw; jfoijwpfwe;jpeiowjf'
    }])
  })
})
