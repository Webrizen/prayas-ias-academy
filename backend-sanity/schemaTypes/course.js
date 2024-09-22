import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    }),
    
    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    
    // Price
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    
    // Discount Price
    defineField({
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number',
    }),
    
    // Mode of Classes
    defineField({
      name: 'modeOfClasses',
      title: 'Mode of Classes',
      type: 'string',
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'Offline', value: 'offline' },
          { title: 'Both', value: 'both' }
        ]
      },
    }),
    
    // Tags for SEO
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    
    // Category
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    
    // Thumbnail Image
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // Demo Video
    defineField({
      name: 'demoVideo',
      title: 'Demo Video',
      type: 'url',
    }),
    
    // Syllabus PDF
    defineField({
      name: 'syllabusPdf',
      title: 'Syllabus PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    
    // Key Features
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    
    // Instructors
    defineField({
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faculty' }] }],
    }),
    
    // Detailed Schedule
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'className', title: 'Class Name', type: 'string' },
            { name: 'date', title: 'Date', type: 'datetime' },
            { name: 'time', title: 'Time', type: 'string' },
            { name: 'numberOfClasses', title: 'Number of Classes', type: 'number' },
          ],
        },
      ],
    }),
    
    // Start and End Date of Course
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    
    // Course Status Chips (Trending, Featured, Limited Seats, Closing Soon)
    defineField({
      name: 'statusChips',
      title: 'Status Chips',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Trending', value: 'trending' },
          { title: 'Featured', value: 'featured' },
          { title: 'Limited Seats', value: 'limitedSeats' },
          { title: 'Closing Soon', value: 'closingSoon' }
        ],
        layout: 'tags',
      },
    }),
    
    // Created At and Updated At
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  
  // Hooks to update "updatedAt" field automatically
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
    },
  },
});