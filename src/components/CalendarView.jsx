import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');
  const appointments = JSON.parse(localStorage.getItem('incidents')) || [];
  const patients = JSON.parse(localStorage.getItem('patients')) || [];

  const getAppointmentsForDate = (selectedDate) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate).toDateString();
      return appointmentDate === selectedDate.toDateString();
    });
  };

  const handlePrevious = () => {
    const newDate = new Date(date);
    if (view === 'month') {
      newDate.setMonth(date.getMonth() - 1);
    } else {
      newDate.setDate(date.getDate() - 7);
    }
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    if (view === 'month') {
      newDate.setMonth(date.getMonth() + 1);
    } else {
      newDate.setDate(date.getDate() + 7);
    }
    setDate(newDate);
  };

  const handleDayClick = (selectedDate) => {
    setDate(selectedDate);
    setView('day');
  };

  const modifiers = {
    hasAppointments: appointments
      .map(a => new Date(a.appointmentDate))
      .filter(d => d >= new Date(new Date().setHours(0, 0, 0, 0))),
  };

  const modifiersStyles = {
    hasAppointments: {
      backgroundColor: '#dbeafe', // Tailwind blue-100
      color: '#1e40af', // Tailwind blue-800
      borderRadius: '50%',
    },
  };

  const getWeekDates = (startDate) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
      <div className="flex gap-4 mb-4">
        <Button onClick={() => setView('month')} variant={view === 'month' ? 'default' : 'outline'}>
          Month
        </Button>
        <Button onClick={() => setView('week')} variant={view === 'week' ? 'default' : 'outline'}>
          Week
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Button onClick={handlePrevious} variant="outline">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <span className="text-lg font-semibold">
          {view === 'month'
            ? date.toLocaleString('default', { month: 'long', year: 'numeric' })
            : `Week of ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
        </span>
        <Button onClick={handleNext} variant="outline">
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      {view === 'month' ? (
        <Card>
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDayClick}
              month={date}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Appointments for Week of {date.toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {getWeekDates(date).map((weekDate, index) => {
              const appointmentsForDate = getAppointmentsForDate(weekDate);
              return (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {weekDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  {appointmentsForDate.length > 0 ? (
                    appointmentsForDate.map(appointment => (
                      <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                        <p className="font-semibold">{appointment.title}</p>
                        <p className="text-sm text-gray-600">
                          Patient: {patients.find(p => p.id === appointment.patientId)?.name || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Time: {new Date(appointment.appointmentDate).toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-600">Status: {appointment.status}</p>
                        {appointment.files.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">Files:</p>
                            {appointment.files.map(file => (
                              <a
                                key={file.name}
                                href={file.url}
                                download
                                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                              >
                                <Download className="w-4 h-4" />
                                {file.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No appointments scheduled.</p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalendarView;