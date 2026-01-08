import { useState, useEffect } from 'react';
import { getProjects, addProject, updateProject, deleteProject, resetProjects } from '../../services/projectsService';
import { faEdit, faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    imageFile: null,
    imagePreview: null,
    categoryKey: 'portfolio.categories.webDevelopment',
    titleKey: '',
    descriptionKey: '',
    link: '',
    tagsKey: '',
    isWorkingOn: false
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result,
          image: reader.result // Store as base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      image: '',
      imageFile: null,
      imagePreview: null,
      categoryKey: 'portfolio.categories.webDevelopment',
      titleKey: '',
      descriptionKey: '',
      link: '',
      tagsKey: '',
      isWorkingOn: false
    });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setIsAdding(false);
    setFormData({
      image: project.image || '',
      imageFile: null,
      imagePreview: project.image || null,
      categoryKey: project.categoryKey || 'portfolio.categories.webDevelopment',
      titleKey: project.titleKey || '',
      descriptionKey: project.descriptionKey || '',
      link: project.link || '',
      tagsKey: project.tagsKey || '',
      isWorkingOn: project.isWorkingOn || false
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      loadProjects();
      // Trigger custom event for same-tab updates
      window.dispatchEvent(new Event('projectsUpdated'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject(formData);
    }
    loadProjects();
    // Trigger custom event for same-tab updates
    window.dispatchEvent(new Event('projectsUpdated'));
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      image: '',
      imageFile: null,
      imagePreview: null,
      categoryKey: 'portfolio.categories.webDevelopment',
      titleKey: '',
      descriptionKey: '',
      link: '',
      tagsKey: '',
      isWorkingOn: false
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      image: '',
      imageFile: null,
      imagePreview: null,
      categoryKey: 'portfolio.categories.webDevelopment',
      titleKey: '',
      descriptionKey: '',
      link: '',
      tagsKey: '',
      isWorkingOn: false
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all projects to default? This cannot be undone.')) {
      resetProjects();
      loadProjects();
      window.dispatchEvent(new Event('projectsUpdated'));
    }
  };

  const categories = [
    { value: 'portfolio.categories.webDevelopment', label: 'Web Development' },
    { value: 'portfolio.categories.uiUxDesign', label: 'UI/UX Design' },
    { value: 'portfolio.categories.mobileApp', label: 'Mobile App' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold gradient-text">Project Management</h2>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-picto-primary text-white rounded-lg font-semibold hover:bg-picto-primary-dark transition-all duration-300 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Project
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image (Upload or use existing: CSS.png, card-1.png, card-2.png, or card-3.png)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black mb-2"
              />
              {formData.imagePreview && (
                <div className="mt-2">
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="max-w-xs h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black mt-2"
                placeholder="Or enter image path/URL (e.g., card-1.png or base64 data)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload an image file or enter an image path/URL. Uploaded images will be stored as base64.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="categoryKey"
                value={formData.categoryKey}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black"
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title Key (e.g., projects.myproject.title)
              </label>
              <input
                type="text"
                name="titleKey"
                value={formData.titleKey}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Key (e.g., projects.myproject.description)
              </label>
              <input
                type="text"
                name="descriptionKey"
                value={formData.descriptionKey}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link
              </label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags Key (e.g., projects.myproject.tags)
              </label>
              <input
                type="text"
                name="tagsKey"
                value={formData.tagsKey}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary text-black"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isWorkingOn"
                  checked={formData.isWorkingOn}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-picto-primary border-gray-300 rounded focus:ring-picto-primary"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show "Working on it" overlay
                </span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-picto-primary text-white rounded-lg font-semibold hover:bg-picto-primary-dark transition-all duration-300"
              >
                {editingId ? 'Update' : 'Add'} Project
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const isBase64 = project.image && project.image.startsWith('data:image');
          const isUrl = project.image && (project.image.startsWith('http://') || project.image.startsWith('https://'));
          const showPreview = isBase64 || isUrl || ['CSS.png', 'card-1.png', 'card-2.png', 'card-3.png'].includes(project.image);
          
          return (
            <div
              key={project.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      ID: {project.id} - {project.titleKey}
                    </h4>
                    <span className="px-2 py-1 bg-picto-primary text-white text-xs rounded">
                      {project.categoryKey.split('.').pop()}
                    </span>
                    {project.isWorkingOn && (
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded font-semibold">
                        Working On It
                      </span>
                    )}
                  </div>
                  {showPreview && (
                    <div className="mb-3">
                      <img 
                        src={project.image} 
                        alt="Project preview" 
                        className="w-32 h-20 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Description:</strong> {project.descriptionKey}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Link:</strong> {project.link}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Image:</strong> {isBase64 ? 'Uploaded Image' : (isUrl ? 'External URL' : project.image)}
                  </p>
                </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  title="Edit"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        );
        })}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-gray-500 py-8">No projects found. Add your first project!</p>
      )}
    </div>
  );
};

export default ProjectManager;
