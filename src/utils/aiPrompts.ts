// src/utils/aiPrompts.ts

export const aiPrompts = {
  generateIdea: "You're helping a creative 5th-grade student come up with a fun project idea. Generate a unique and imaginative idea that's suitable for their age group and could be developed into a cool project. Be specific and descriptive!",
  
  generatePersona: (currentIdea: string) => `
    Imagine you're creating a fun character who would absolutely love this idea: "${currentIdea}". 
    This character should be someone a 5th-grader might know or look up to.
    Create a JSON object with these fields (and only these fields):
    {
      "name": "Character's Name",
      "age": Age as a number,
      "occupation": "Job or role",
      "interests": ["Interest 1", "Interest 2", "Interest 3"],
      "reasonForInterest": "A short, kid-friendly explanation of why they like the idea"
    }
    Make sure it's valid JSON that can be parsed!
  `,

  generateDirection: (currentIdea: string, personasContext: string) => `
    You're a creative coach helping a 5th-grade student develop their awesome idea: "${currentIdea}"
    Their idea has caught the attention of these cool characters:
    ${personasContext}

    Come up with a fun direction to take this idea that these characters would love!
    Respond with a JSON object like this:
    {
      "direction": "A short, exciting description of the new direction",
      "rationale": "An explanation of why this direction is awesome and how it relates to the characters"
    }
    Keep it simple, fun, and suitable for kids!
  `,

  refineIdea: (currentIdea: string, refinementNotes: string) => `
    You're helping a 5th-grade student make their idea even cooler!
    Current idea: "${currentIdea}"
    Their thoughts on how to improve it: "${refinementNotes}"

    Take their idea and their improvement thoughts, and create an even more awesome version!
    Be creative, specific, and keep it fun for kids. Explain the refined idea in a way that's easy for a 5th-grader to understand and get excited about!
  `,

  generateSocialMediaContent: (currentIdea: string, platform: string) => `
    Imagine you're helping a 5th-grade student create a super cool ${platform} post about their awesome idea: "${currentIdea}".
    Write a fun, engaging post that would make other kids want to learn more about the idea.
    Keep it short, exciting, and appropriate for ${platform}. Use emojis if they fit the platform!
    Remember, this is for kids, so keep the language simple and the content kid-friendly.
  `,

  finalPolish: (currentIdea: string, finalAdjustments: string) => `
    You're putting the finishing touches on a 5th-grade student's amazing project idea!
    Their current awesome idea is: "${currentIdea}"
    They want to make these final tweaks: "${finalAdjustments}"

    Take their idea and their final thoughts, and create the ultimate, super-polished version!
    Make it sound exciting, clear, and ready to present to their class.
    Use simple language that a 5th-grader would understand and find thrilling.
    Include a brief (2-3 sentences) explanation of why this idea is so cool and what makes it special.
  `,

  generateAIFeedback: (currentIdea: string) => `
    You're a friendly AI assistant helping a 5th-grade student improve their project idea: "${currentIdea}"
    Give them 3 short, encouraging pieces of feedback or suggestions to make their idea even more amazing.
    Keep each suggestion to 1-2 sentences, using simple language a kid would understand.
    Be positive, creative, and inspiring!
  `,

  generatePersonaFeedback: (persona: string, currentIdea: string) => `
    Pretend you're this character: ${persona}
    A 5th-grade student has come to you with this cool idea: "${currentIdea}"
    Give them one specific, encouraging suggestion to make their idea even better.
    Speak in a way that matches your character and would be easy for a kid to understand.
    Keep your response short and fun - no more than 2-3 sentences!
  `
};