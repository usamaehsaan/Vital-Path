// Simple toast utility functions for the medical network app
// These provide user feedback for various actions

export const showSuccess = (message: string) => {
  // In a real app, this would integrate with a toast library like react-hot-toast
  console.log('✅ Success:', message);
  
  // For now, we'll use a simple alert to provide user feedback
  // This can be replaced with a proper toast library later
  if (typeof window !== 'undefined') {
    // Create a simple toast-like notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
};

export const showError = (message: string) => {
  console.log('❌ Error:', message);
  
  if (typeof window !== 'undefined') {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
};

export const showInfo = (message: string) => {
  console.log('ℹ️ Info:', message);
  
  if (typeof window !== 'undefined') {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
};

export const showWarning = (message: string) => {
  console.log('⚠️ Warning:', message);
  
  if (typeof window !== 'undefined') {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
};