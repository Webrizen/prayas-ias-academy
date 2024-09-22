import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pyq',
  title: 'Previous Year Questions (PYQs)',
  type: 'document',
  fields: [
    // Subject Name
    defineField({
      name: 'subject',
      title: 'Subject Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    // Content (Block Content)
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),
    
    // PDF Attachment
    defineField({
      name: 'pdf',
      title: 'PDF Attachment',
      type: 'file',
      options: {
        accept: '.pdf',
      },
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