import React, { useState } from "react";
import Header from "./DHeader/Header";
import { MedsSection } from "./SchedMed/MedsSection/MedsSection";
import Timeline from "./Calendar/TimeSlot/timeSlot";
import Aspirine from "./SchedMed/cardsMeds/MedsContent/MedsImage/Aspirine.png";
import WCalendar from "./WeeklyCal/DaysBox/WCalendar";
import { isWithinInterval } from 'date-fns';
import History from "./History/DailyHistory/DHistory";
import AppLayout from "./Laayout/hmLaayout";
import AddMedicine from "../NewMeds/NewMeds";

export default function Home() {
    // State bach tbedl Dashboard and Add Page
    const [isAdding, setIsAdding] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('home');

    const Meds = [
        {
            id: 1,
            name: 'Xanax',
            image: Aspirine,
            description: 'for headAttack',
            dosage: '250mg',
            quantity: '3 pills',
            schedule: '3 par jours',
            duration: '6 jours',
            time: [
                { hour: 8, display: '8:00 AM' },
                { hour: 12, display: '12:00 PM' },
                { hour: 20, display: '8:00 PM' }
            ],
            startDate: new Date(2025, 11, 7),
            endDate: new Date(2025, 11, 13)
        },
        {
            id: 2,
            name: 'Alpraz',
            image: Aspirine,
            description: 'Alpraz',
            dosage: '1000mg',
            quantity: '3 pills',
            schedule: '1 par jours',
            duration: '6 jours',
            time: [
                { hour: 10, display: '10:00 AM' },
                { hour: 12, display: '12:00 PM' }
            ],
            startDate: new Date(2025, 11, 14),
            endDate: new Date(2025, 11, 20),
        },
        {
            id: 3,
            name: 'Aspirine 500MG',
            image: Aspirine,
            dosage: '500mg',
            quantity: '2 pills',
            schedule: '2x par jours',
            duration: '5 jours',
            time: [
                { hour: 11, display: '11:00 AM' },
                { hour: 14, display: '2:00 PM' }
            ],
            startDate: new Date(2025, 11, 12),
            endDate: new Date(2025, 11, 17),
        }
    ];

    const getMeds = (date) => {
        return Meds.filter(med => {
            return isWithinInterval(date, {
                start: med.startDate,
                end: med.endDate
            });
        });
    };

    const generateMeds = (date) => {
        const medsForDate = getMeds(date);
        const schedule = [];
        medsForDate.forEach(med => {
            med.time.forEach(time => {
                schedule.push({
                    hour: time.hour,
                    time: time.display,
                    medicines: [{
                        name: med.name,
                        dosage: med.dosage,
                        quantity: med.quantity
                    }]
                });
            });
        });
        const groupedSchedule = schedule.reduce((acc, item) => {
            const existing = acc.find(s => s.hour === item.hour);
            if (existing) {
                existing.medicines.push(...item.medicines);
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        return groupedSchedule.sort((a, b) => a.hour - b.hour);
    };
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    const medsForDate = getMeds(selectedDate);
    const scheduleForDate = generateMeds(selectedDate);

    // If 'isAdding' is true, return the Add Page immediately
    if (isAdding) {
        return (
            <AddMedicine 
                onBack={() => setIsAdding(false)} 
            />
        );
    }

    return (
        <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
            <Header UserName="Simo" />
            <MedsSection 
                Meds={Meds} 
                onAddNew={() => setIsAdding(true)} 
            />
            <WCalendar onDateSelect={handleDateSelect} />
            <Timeline
                schedules={scheduleForDate}
                selectedDate={selectedDate}
            />
            <div style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#666' }}>
                <p><strong>Selected Date:</strong> {selectedDate.toDateString()}</p>
                <p><strong>Medicines active:</strong> {medsForDate.length}</p>
            </div>
            <History
                schedules={scheduleForDate}
                selectedDate={selectedDate}
            />
            </AppLayout>
        
    );
}