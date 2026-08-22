import Swal from 'sweetalert2';

export const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  customClass: {
    popup: 'font-sans rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white',
  },
});

export const notifySuccess = (title: string, message?: string) => {
  toast.fire({
    icon: 'success',
    title: title,
    text: message,
    iconColor: '#10B981',
  });
};

export const notifyInfo = (title: string, message?: string) => {
  toast.fire({
    icon: 'info',
    title: title,
    text: message,
    iconColor: '#3B82F6',
  });
};

export const notifyError = (title: string, message?: string) => {
  toast.fire({
    icon: 'error',
    title: title,
    text: message,
    iconColor: '#EF4444',
  });
};

export const showConfirmModal = (
  title: string,
  text: string,
  confirmButtonText: string = 'Yes, proceed'
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#000000',
    cancelButtonColor: '#94A3B8',
    confirmButtonText: confirmButtonText,
    customClass: {
      popup: 'font-sans rounded-3xl dark:bg-slate-900 dark:text-white',
    },
  });
};
