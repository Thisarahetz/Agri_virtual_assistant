class AdaptiveFilter {
    private weights: number[]; // Filter weights
    private buffer: number[]; // Input buffer to store past samples
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
  
  // Example usage:
  const bufferSize = 10;
  const stepSize = 0.01;
  
  // Create an instance of the adaptive filter
  const filter = new AdaptiveFilter(bufferSize, stepSize);
  
  // Process a sequence of input samples
  const inputSamples = [0.5, 0.2, 0.1, 0.8, 0.4, 0.6];
  for (const sample of inputSamples) {
    const filteredSample = filter.filter(sample);
    console.log(`Input: ${sample.toFixed(2)} | Filtered Output: ${filteredSample.toFixed(2)}`);
  }
  