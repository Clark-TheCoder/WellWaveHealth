export function generatePatientAlias(patientFirstname, patientDayOfBirth) {
  return patientFirstname.slice(0, 2) + patientDayOfBirth;
}
