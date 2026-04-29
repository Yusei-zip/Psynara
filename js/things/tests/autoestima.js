export const testAutoestima = {
    id: 'autoestima',
    title: 'Test de Autoestima',
    description: 'Evalúa la percepción que tienes sobre tu propio valor y tus capacidades.',
    duration: '3 minutos',
    questions: [
        {
            id: 'q1',
            text: '¿Con qué frecuencia sientes que no tienes mucho de lo que estar orgulloso/a?',
            options: [
                { text: 'Casi nunca', value: 0 },
                { text: 'A veces', value: 1 },
                { text: 'A menudo', value: 2 },
                { text: 'Casi siempre', value: 3 }
            ]
        },
        {
            id: 'q2',
            text: '¿Con qué frecuencia te sientes verdaderamente inútil o incapaz de hacer las cosas bien?',
            options: [
                { text: 'Casi nunca', value: 0 },
                { text: 'A veces', value: 1 },
                { text: 'A menudo', value: 2 },
                { text: 'Casi siempre', value: 3 }
            ]
        },
        {
            id: 'q3',
            text: 'En el fondo, ¿tiendes a pensar o sentir que eres un fracaso?',
            options: [
                { text: 'Casi nunca', value: 0 },
                { text: 'A veces', value: 1 },
                { text: 'A menudo', value: 2 },
                { text: 'Casi siempre', value: 3 }
            ]
        },
        {
            id: 'q4',
            text: '¿Sientes que te exiges demasiado y eres muy duro/a contigo mismo/a cuando te equivocas?',
            options: [
                { text: 'Casi nunca', value: 0 },
                { text: 'A veces', value: 1 },
                { text: 'A menudo', value: 2 },
                { text: 'Casi siempre', value: 3 }
            ]
        },
        {
            id: 'q5',
            text: '¿Te cuesta aceptar elogios o sentir que realmente mereces las cosas buenas que te pasan?',
            options: [
                { text: 'Casi nunca', value: 0 },
                { text: 'A veces', value: 1 },
                { text: 'A menudo', value: 2 },
                { text: 'Casi siempre', value: 3 }
            ]
        }
    ],
    evaluate: (score) => {
        if (score <= 4) {
            return {
                title: 'Autoestima Saludable',
                description: 'Tus respuestas indican que tienes una visión generalmente positiva de ti mismo/a. Logras reconocer tu valor y tratarte con compasión, incluso cuando te equivocas.'
            };
        } else if (score <= 9) {
            return {
                title: 'Autoestima Irregular / Media',
                description: 'Muestras una autoestima promedio, aunque a veces dudas de tu propio valor o te tratas con dureza. Sería beneficioso trabajar en reforzar la autoaceptación y reducir la autocrítica excesiva.'
            };
        } else {
            return {
                title: 'Baja Autoestima',
                description: 'Tus resultados sugieren que estás siendo muy duro/a contigo mismo/a y tienes dificultades para ver tu propio valor. Sentirse así puede afectar muchas áreas de tu vida. Iniciar un proceso terapéutico puede ayudarte enormemente a reconstruir la confianza y el amor propio.'
            };
        }
    }
};
