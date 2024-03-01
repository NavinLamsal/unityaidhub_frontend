// import { Delta } from 'quill';

// interface DeltaNode {
//   insert: string;
//   attributes?: Record<string, any>;
// }

// export const parseContent = (content: string): Delta => {
//   const lines = content.split('\n');
//   let delta = new Delta();
//   let currentLine = '';

//   lines.forEach((line) => {
//     if (line.startsWith('insert⟨')) {
//       const node: DeltaNode = {
//         insert: line.slice('insert⟨'.length, -1),
//       };

//       if (line.includes('+')) {
//         const [, key, value] = line.slice('+').split(':');
//         node.attributes = {};
//         node.attributes[key] = value === 'true';
//       }

//       delta = delta.insert(node);
//       currentLine = '';
//     } else {
//       currentLine += line;
//     }

//     if (line.endsWith('⟩')) {
//       delta = delta.insert(currentLine, node.attributes);
//       currentLine = '';
//     }
//   });

//   return new Delta(delta.ops);
// };