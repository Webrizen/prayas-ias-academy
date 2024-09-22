import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    // Notification Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    // Notification Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    
    // Tag (what the notification is about)
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Tag for the notification (e.g., "Exam", "Admission")',
      validation: Rule => Rule.required(),
    }),
    
    // Optional PDF Attachment
    defineField({
      name: 'pdf',
      title: 'PDF Attachment (Optional)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    // Optional Source (Link)
    defineField({
      name: 'source',
      title: 'Source (Optional)',
      type: 'url',
      description: 'Link to the source of the notification (optional)',
    }),
    
    // Created At
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
  ],
});