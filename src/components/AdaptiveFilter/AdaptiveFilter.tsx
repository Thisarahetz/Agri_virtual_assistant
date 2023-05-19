class AdaptiveFilter {
    private weights: number[]; // Filter weights 
    private buffer: number[]; // Input buffer to store past samples newWeight = oldWeight + stepSize * error * bufferElement
    private bufferSize: number; // Size of the input buffer
    private stepSize: number; // Step size for filter adaptation
  
    constructor(bufferSize: number, stepSize: number) {
      this.weights = [];
      this.buffer = [];
      this.bufferSize = bufferSize;
      this.stepSize = stepSize;
    }
  
    public filter(sample: number): number {
      // Add the current sample to the input buffer
      this.buffer.unshift(sample);
      if (this.buffer.length > this.bufferSize) {
        this.buffer.pop();
      }
  
      // Compute the filtered output
      let output = 0;
      for (let i = 0; i < this.buffer.length; i++) {
        output += this.weights[i] * this.buffer[i];
      }
  
      // Update filter weights using the LMS algorithm
      const error = sample - output;
      for (let i = 0; i < this.buffer.length; i++) {
        this.weights[i] += this.stepSize * error * this.buffer[i];
      }
  
      return output;
    }
  }
  

  