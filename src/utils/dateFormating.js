const getTimeZoneOffset = (timeZone) => {
    const timeZoneOffsets = {
      "Australia/Melbourne": "+10:00",
      "Asia/Shanghai": "+08:00",
      "Asia/Tokyo": "+09:00",
      "Asia/Bahrain": "+03:00",
      "Asia/Riyadh": "+03:00",
      "Europe/Rome": "+00:00",
      "Europe/Monaco": "+00:00",
      "Europe/Madrid": "+00:00",
      "America/Toronto": "-06:00",
      "Europe/Vienna": "+02:00",
      "Europe/London": "-01:00",
      "Europe/Brussels": "+00:00",
      "Europe/Budapest": "+00:00",
      "Europe/Amsterdam": "+00:00",
      "Asia/Baku": "+02:00",
      "Asia/Singapore": "+06:00",
      "America/Chicago": "-07:00",
      "America/Mexico_City": "-08:00",
      "America/Sao_Paulo": "-04:00",
      "America/Los_Angeles": "-09:00",
      "Asia/Qatar": "+02:00",
      "Asia/Dubai": "+03:00",
      "America/New_York": "-06:00",
    };
  
    return timeZoneOffsets[timeZone] || "+00:00";
  };
  

export const formatTime = (startTime, endTime) => {
    const formatTimeWithoutSeconds = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    return `${formatTimeWithoutSeconds(startTime)} - ${formatTimeWithoutSeconds(endTime)}`;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };

    const formattedDate = date.toLocaleDateString('es-ES', options);
    const [day, month] = formattedDate.split(" de ");

    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    return `${day} de ${capitalizedMonth}`;
};

export const convertToLocalTime = (dateString, startTime, endTime, timeZone) => {
    const startDate = new Date(`${dateString}T${startTime}${getTimeZoneOffset(timeZone)}`);
    const endDate = new Date(`${dateString}T${endTime}${getTimeZoneOffset(timeZone)}`);
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    };
  
    const formattedStartTime = new Intl.DateTimeFormat('es-ES', {
      ...options,
      timeZone: 'UTC',
    }).format(startDate);
  
    const formattedEndTime = new Intl.DateTimeFormat('es-ES', {
      ...options,
      timeZone: 'UTC',
    }).format(endDate);
  
    return `${formattedStartTime} - ${formattedEndTime}`;
  };