import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// spies = espiões
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64/qualquerCoisa',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,qualquerCoisa',
      })
    ).rejects.toThrow();
  });

  it('should not be able submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,qualquerCoisa',
      })
    ).rejects.toThrow();
  });

  it('should not be able submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'TEST.png',
      })
    ).rejects.toThrow();
  });
});
