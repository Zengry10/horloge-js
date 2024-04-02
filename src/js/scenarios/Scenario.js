import Scene from "../canvas/Scene"
import { deg2rad, drawLine } from "../utils/MathUtils"

export default class Clock extends Scene {
    constructor(id) {
        super(id)

        // debug
        this.params['line-width'] = 2
        this.params.color = "#ffffff"
        if (this.debug.active) {
            this.debugFolder.add(this.params, 'line-width', 1, 10).onChange(() => this.drawUpdate())
            this.debugFolder.addColor(this.params, 'color')
        }
    }

    resize() {
        super.resize()

        // refresh
        this.drawUpdate()
    }

    update() {
        if (!super.update()) return
        this.drawUpdate()
    }

    drawUpdate() {
        this.clear()

        // draw
        this.drawClockBase()
        this.drawClockHands()
    }

    drawClockBase() {
        const centerX = this.width / 2
        const centerY = this.height / 2

        // draw clock face
        this.context.beginPath()
        this.context.arc(centerX, centerY, Math.min(this.width, this.height) * 0.4, 0, Math.PI * 2)
        this.context.strokeStyle = this.params.color
        this.context.lineWidth = this.params['line-width']
        this.context.stroke()
        this.context.closePath()

        // draw hour indicators
        for (let i = 0; i < 12; i++) {
            const angle = deg2rad(30 * i)
            const x1 = centerX + Math.cos(angle) * this.width * 0.35
            const y1 = centerY + Math.sin(angle) * this.height * 0.35
            const x2 = centerX + Math.cos(angle) * this.width * 0.4
            const y2 = centerY + Math.sin(angle) * this.height * 0.4
            drawLine(this.context, x1, y1, x2, y2)
        }
    }

    drawClockHands() {
        const now = new Date()
        const centerX = this.width / 2
        const centerY = this.height / 2
    
        const hour = now.getHours(); // Heure locale
        const minute = now.getMinutes();
        const second = now.getSeconds();
    
        const hourAngle = deg2rad((hour % 12) * 30 + (0.5 * minute) - 90) // Adjusted by subtracting 90 degrees
        const minuteAngle = deg2rad(minute * 6 - 90) // Adjusted by subtracting 90 degrees
        const secondAngle = deg2rad(second * 6 - 90) // Adjusted by subtracting 90 degrees
    
        // draw hour hand
        this.context.beginPath()
        this.context.moveTo(centerX, centerY)
        this.context.lineTo(centerX + Math.cos(hourAngle) * this.width * 0.2, centerY + Math.sin(hourAngle) * this.height * 0.2)
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 4
        this.context.stroke()
        this.context.closePath()
    
        // draw minute hand
        this.context.beginPath()
        this.context.moveTo(centerX, centerY)
        this.context.lineTo(centerX + Math.cos(minuteAngle) * this.width * 0.3, centerY + Math.sin(minuteAngle) * this.height * 0.3)
        this.context.strokeStyle = 'red' // Minute hand in red
        this.context.lineWidth = 3
        this.context.stroke()
        this.context.closePath()
    
        // draw second hand
        this.context.beginPath()
        this.context.moveTo(centerX, centerY)
        this.context.lineTo(centerX + Math.cos(secondAngle) * this.width * 0.4, centerY + Math.sin(secondAngle) * this.height * 0.4)
        this.context.strokeStyle = 'red'
        this.context.lineWidth = 2
        this.context.stroke()
        this.context.closePath()
    }
    
    
}
