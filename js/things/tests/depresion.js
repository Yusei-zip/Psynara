export const testDepresion = {
    id: 'depresion',
    title: 'Test de Síntomas Depresivos',
    description: 'Breve cuestionario para identificar la presencia de síntomas asociados a la depresión en las últimas semanas.',
    duration: '3 minutos',
    questions: [
        {
            id: 'q1',
            text: 'Durante las últimas 2 semanas, ¿con qué frecuencia has tenido poco interés o placer en hacer las cosas que solían gustarte?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q2',
            text: 'Durante las últimas 2 semanas, ¿con qué frecuencia te has sentido desanimado/a, deprimido/a o sin esperanza?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q3',
            text: 'Durante las últimas 2 semanas, ¿con qué frecuencia te has sentido muy cansado/a o con muy poca energía?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q4',
            text: 'Durante las últimas 2 semanas, ¿has sentido falta de amor propio (sentir que eres un fracaso o que te has decepcionado a ti o a tu familia)?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q5',
            text: 'Durante las últimas 2 semanas, ¿has tenido dificultad para concentrarte en cosas cotidianas, como leer o ver una serie?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        }
    ],
    evaluate: (score) => {
        if (score <= 4) {
            return {
                title: 'Nivel Mínimo',
                description: 'Tus respuestas no sugieren la presencia de síntomas depresivos significativos. Es normal tener algunos días malos, pero parece que mantienes un buen estado de ánimo general.'
            };
        } else if (score <= 9) {
            return {
                title: 'Síntomas Leves',
                description: 'Tus respuestas indican la presencia de algunos síntomas leves de depresión o desánimo. Podría ser un momento adecuado para prestar más atención a tus rutinas de autocuidado y buscar espacios para relajarte y hablar sobre cómo te sientes.'
            };
        } else if (score <= 14) {
            return {
                title: 'Síntomas Moderados',
                description: 'Tus resultados sugieren síntomas moderados de depresión, lo que indica que esto probablemente está afectando tu bienestar y tu rutina diaria. Te recomiendo encarecidamente agendar una sesión para evaluar a fondo tu situación y encontrar estrategias de alivio.'
            };
        } else {
            return {
                title: 'Síntomas Severos',
                description: 'Has reportado síntomas severos de depresión. Es muy importante que sepas que esto tiene tratamiento y que no tienes que enfrentarlo a solas. Por favor, busca acompañamiento psicológico lo antes posible para recibir la ayuda que mereces.'
            };
        }
    }
};
