// schemas/currentAffairs.js
export default {
    name: 'currentAffairs',
    title: 'Current Affairs',
    type: 'document',
    fields: [
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: [
            { title: 'Short Rapid Update', value: 'short' },
            { title: 'Detailed Blog Entry', value: 'detailed' },
          ],
          layout: 'dropdown',
        },
      },
      {
        name: 'headline',
        title: 'Headline',
        type: 'string',
        hidden: ({ document }) => document?.type !== 'short', // Show only for short updates
      },
      {
        name: 'source',
        title: 'Source',
        type: 'string',
        hidden: ({ document }) => document?.type !== 'short', // Show only for short updates
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        hidden: ({ document }) => document?.type !== 'detailed', // Show only for detailed entries
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        hidden: ({ document }) => document?.type !== 'detailed',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'blockContent', // Assuming you have a blockContent schema defined
        hidden: ({ document }) => document?.type !== 'detailed',
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        hidden: ({ document }) => document?.type !== 'detailed',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'string',
        hidden: ({ document }) => document?.type !== 'detailed',
      },
      {
        name: 'shortDescription',
        title: 'Short Description',
        type: 'text',
        hidden: ({ document }) => document?.type !== 'detailed',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
        },
      },
    ],
  };  