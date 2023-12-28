
export const extractInitials = (name: string): string => {
    const nameParts = name.split(' ');
  
    if (nameParts.length >= 2) {
      const firstNameInitial = nameParts[0].charAt(0);
      const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
  
      return `${firstNameInitial}${lastNameInitial}`;
    } else if (nameParts.length === 1) {
      return nameParts[0].charAt(0);
    }
    return 'U';
  };
  