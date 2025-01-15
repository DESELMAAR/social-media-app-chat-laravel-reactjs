import { useState } from "react";

const EditPost = ({ post, onUpdate, onCancel }) => {
  const [updatedContent, setUpdatedContent] = useState(post.content);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(post.id, updatedContent); // Call the parent's update function
  };

  return (
    <div className="bg-slate-950 shadow-md rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          placeholder="Edit your post..."
          className="w-full p-2 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-900 text-slate-300"
          rows={3}
        />
        <div className="flex justify-end space-x-2 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-300 text-sm font-semibold transition-colors hover:text-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-slate-300 text-sm font-semibold transition-colors hover:text-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;