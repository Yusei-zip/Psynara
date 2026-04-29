export const testAnsiedad = {
    id: 'ansiedad-basico',
    title: 'Test de Ansiedad General',
    description: 'Breve evaluación para identificar niveles de ansiedad comunes basados en síntomas recientes.',
    duration: '3 minutos',
    questions: [
        {
            id: 'q1',
            text: 'Durante las últimas 2 semanas, ¿con qué frecuencia te has sentido nervioso/a, ansioso/a o con los nervios de punta?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q2',
            text: '¿Con qué frecuencia no has podido dejar de preocuparte o controlar tu preocupación?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q3',
            text: '¿Con qué frecuencia te has preocupado demasiado por diferentes cosas?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q4',
            text: '¿Con qué frecuencia has tenido dificultad para relajarte?',
            options: [
                { text: 'Nunca', value: 0 },
                { text: 'Varios días', value: 1 },
                { text: 'Más de la mitad de los días', value: 2 },
                { text: 'Casi todos los días', value: 3 }
            ]
        },
        {
            id: 'q5',
            text: '¿Con qué frecuencia te has sentido tan inquieto/a que es difícil quedarte quieto/a?',
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
                title: 'Nivel Mínimo de Ansiedad',
                description: 'Tus respuestas indican un nivel mínimo o normal de ansiedad. Es común sentir cierta preocupación de vez en cuando, pero parece que actualmente logras manejarlo adecuadamente.'
            };
        } else if (score <= 9) {
            return {
                title: 'Ansiedad Leve',
                description: 'Tus respuestas sugieren un nivel leve de ansiedad. Podría ser un buen momento para incorporar técnicas de relajación, autocuidado o buscar orientación si notas que los síntomas persisten o aumentan.'
            };
        } else if (score <= 14) {
            return {
                title: 'Ansiedad Moderada',
                description: 'Tus resultados indican ansiedad moderada. Es probable que estos síntomas estén afectando tu día a día. Te recomendaría agendar una primera sesión para explorar formas de gestionar esto y mejorar tu bienestar.'
            };
        } else {
            return {
                title: 'Ansiedad Severa',
                description: 'Has reportado un nivel alto de ansiedad constante. Es muy importante que no atravieses esto en soledad. Buscar apoyo psicológico profesional te dará las herramientas necesarias para encontrar alivio y recuperar el control.'
            };
        }
    }
};
