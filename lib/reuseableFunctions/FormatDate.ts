export function formatDate(dateString: string): string {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
  
    // Set currentDate to UTC
    const currentUTCTime = Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds(),
      currentDate.getUTCMilliseconds()
    );
  
    let remainingTimeDifference = currentUTCTime - inputDate.getTime();
  
    interface TimeUnit {
      value: number;
      label: string;
      pluralLabel: string;
    }
  
    const units: TimeUnit[] = [
      { value: 60, label: 'minute', pluralLabel: 'minutes' },
      { value: 60, label: 'hour', pluralLabel: 'hours' },
      { value: 24, label: 'day', pluralLabel: 'days' },
      { value: 7, label: 'week', pluralLabel: 'weeks' },
      { value: 4, label: 'month', pluralLabel: 'months' }
    ];
  
    for (const unit of units) {
      const unitDifference = Math.floor(remainingTimeDifference / (unit.value * 60000)); 
  
      if (unitDifference < unit.value) {
        return unitDifference > 1
          ? `${unitDifference} ${unit.pluralLabel} ago`
          : `${unitDifference} ${unit.label} ago`;
      }
  
      remainingTimeDifference = unitDifference; 
    }
  
    const monthNames: string[] = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  
    return `${inputDate.getUTCDate()} ${monthNames[inputDate.getUTCMonth()]} ${inputDate.getUTCFullYear()}`;
  }
  