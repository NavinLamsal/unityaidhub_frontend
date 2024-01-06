// // components/TextEditorFormField.tsx
// import React from 'react';
// import { UseFormRegister } from 'react-hook-form';
// import RichTextEditor from './Richtexteditor';

// interface TextEditorFormFieldProps {
//   label: string;
//   name: string;
//   register: UseFormRegister<any>;
// }

// const TextEditorFormField: React.FC<TextEditorFormFieldProps> = ({ label, name, register }) => {
//   return (
//     <div className="mb-6">
//       <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
//       <div className="relative rounded-md shadow-sm">
//         <RichTextEditor
//           value=""
//           onChange={(content) => {
//             register(name, { value: content, required: 'This field is required' });
//           }}
//         //   className="py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
//           placeholder={`Enter ${label.toLowerCase()}...`}
//         />
//       </div>
//     </div>
//   );
// };

// export default TextEditorFormField;
