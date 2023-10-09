---
name: Work Announcement
description: Announce what you are planning to work on to avoid duplicate efforts.
labels: ["📢 work announcement"]
assignees:
body:
  - type: markdown
    attributes:
      value: |
        Thanks for announcing your intent to work on a feature or fix! This will help others know what's currently being addressed and prevent overlapping efforts.
  - type: checkboxes
    id: guide
    attributes:
      label: Contributing Guidelines
      description: By submitting this issue, you agree to comply with the [Contributing Guidelines](https://github.com/0Ky/screenclip/blob/dev/CONTRIBUTING.md)
      options:
        - label: I agree to follow this project's Contributing Guidelines
          required: true
  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      description: By submitting this issue, you agree to follow our [Code of Conduct](https://github.com/0Ky/screenclip/blob/dev/CODE_OF_CONDUCT.md)
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true
  - type: textarea
    id: task-description
    attributes:
      label: What are you planning to work on?
      description: Please describe the task or feature you plan to address.
      placeholder: "I am planning to..."
    validations:
      required: true
  - type: dropdown
    id: estimated-completion
    attributes:
      label: Estimated completion time?
      options:
        - Within a day
        - 1-3 days
        - Within a week
        - More than a week
    validations:
      required: true
  - type: textarea
    id: additional-notes
    attributes:
      label: Any additional notes or comments?
      placeholder: "For instance, any help, information or resources you might need..."
---