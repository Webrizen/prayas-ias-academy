import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    // Faculty Name
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    // Faculty Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // Designation (e.g., Professor, Lecturer)
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
    }),
    
    // Bio
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    
    // Social Links (optional)
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'url' }],
    }),
  ],
});