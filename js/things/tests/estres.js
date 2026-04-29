export const testEstres = {
    id: 'estres-percibido',
    title: 'Test de Estrés Percibido',
    description: 'Evalúa la frecuencia en que has sentido que las situaciones de tu vida han excedido tu capacidad para manejarlas.',
    duration: '2 minutos',
    questions: [
        {
            id: 'q1',
            text: 'En el último mes, ¿con qué frecuencia te has sentido afectado/a por algo que ha ocurrido inesperadamente?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Casi nunca', value: 1 },
                { text: 'De vez en cuando', value: 2 },
                { text: 'A menudo', value: 3 },
                { text: 'Muy a menudo', value: 4 }
            ]
        },
        {
            id: 'q2',
            text: 'En el último mes, ¿con qué frecuencia te has sentido incapaz de controlar las cosas importantes en tu vida?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Casi nunca', value: 1 },
                { text: 'De vez en cuando', value: 2 },
                { text: 'A menudo', value: 3 },
                { text: 'Muy a menudo', value: 4 }
            ]
        },
        {
            id: 'q3',
            text: 'En el último mes, ¿con qué frecuencia te has sentido nervioso/a y estresado/a?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Casi nunca', value: 1 },
                { text: 'De vez en cuando', value: 2 },
                { text: 'A menudo', value: 3 },
                { text: 'Muy a menudo', value: 4 }
            ]
        },
        {
            id: 'q4',
            text: 'En el último mes, ¿con qué frecuencia has estado enojado/a porque las cosas que te han ocurrido estaban fuera de tu control?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Casi nunca', value: 1 },
                { text: 'De vez en cuando', value: 2 },
                { text: 'A menudo', value: 3 },
                { text: 'Muy a menudo', value: 4 }
            ]
        }
    ],
    evaluate: (score) => {
        if (score <= 5) {
            return {
                title: 'Bajo Nivel de Estrés',
                description: 'Pareces estar manejando las demandas de tu vida de manera efectiva en este momento. Tienes una buena sensación de control y equilibrio.'
            };
        } else if (score <= 10) {
            return {
                title: 'Nivel Moderado de Estrés',
                description: 'Experimentas un nivel de estrés moderado. Algunas situaciones te pueden resultar abrumadoras, pero en general logras salir adelante. Dedicar tiempo al autocuidado y la relajación te será muy útil.'
            };
        } else {
            return {
                title: 'Nivel Alto de Estrés',
                description: 'Tus respuestas indican que actualmente estás lidiando con un alto nivel de estrés que puede estar afectando tu calidad de vida. Te sugiero que consideres agendar una sesión para identificar estos detonantes y trabajar en estrategias saludables de afrontamiento.'
            };
        }
    }
};
