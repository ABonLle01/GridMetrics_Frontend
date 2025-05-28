import { useState, useEffect } from 'react';

export const useCuentaRegresiva = (fechaObjetivo, timeZoneCircuito) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (!fechaObjetivo || !timeZoneCircuito) return;

    const updateCountdown = () => {
      try {
        const [datePart, timePart] = fechaObjetivo.split('T');
        const [year, month, day] = datePart.split('-');
        const [targetHours, targetMinutes] = timePart.split(':');
        
        const target = new Date(Date.UTC(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(targetHours),
          parseInt(targetMinutes)
        ));
        
        const circuitOffset = new Date().toLocaleString('en-US', { 
          timeZone: timeZoneCircuito,
          timeZoneName: 'longOffset'
        }).match(/GMT([+-]\d{2}:\d{2})/)[1];
        
        const [offsetHours, offsetMinutes] = circuitOffset.split(':').map(Number);
        const totalOffsetMinutes = offsetHours * 60 + offsetMinutes;
        target.setMinutes(target.getMinutes() - totalOffsetMinutes);
        
        const now = new Date();
        const adjustedNow = new Date(now.getTime());
        const difference = target - adjustedNow;

        if (difference <= 0) {
          setTimeLeft({ finalizado: true });
          return;
        }

        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = Math.floor(totalSeconds % 60);

        setTimeLeft({
          days,
          hours: totalSeconds < 86400 ? Math.floor(difference / (1000 * 60 * 60)) : hours,
          minutes: mins,
          seconds: secs,
          totalHours: Math.floor(difference / (1000 * 60 * 60)),
          userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          circuitTimeZone: timeZoneCircuito
        });

      } catch (error) {
        console.error("Error en useCuentaRegresiva:", error);
        setTimeLeft({ error: true });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [fechaObjetivo, timeZoneCircuito]);

  return timeLeft;
};